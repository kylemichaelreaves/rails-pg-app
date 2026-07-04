# frozen_string_literal: true

# Seeds the `transactions` table from bank-export CSVs stored in a personal S3
# bucket. This mirrors the ingestion pipeline in the `transactions-bucket-to-db`
# Lambda (transactions_bucket_to_db/utilities/{s3_operations,dataframe_operations}.py).
#
# The bucket name is intentionally NOT committed — this repo is public. It is read
# from ENV['TRANSACTIONS_BUCKET'] (see config/local_env.yml, which is gitignored;
# copy config/local_env.yml.example to get started). AWS credentials come from the
# usual chain (e.g. `AWS_PROFILE=personal`).
#
#   TRANSACTIONS_BUCKET  name of the S3 bucket holding YYYY_MM.csv exports
#   INGEST_USER_ID       users.id to stamp on every ingested row (defaults to the seed user)

require 'csv'
require 'aws-sdk-s3'

# Exact header set the bank exports carry, in order. Used both to locate the
# header row (which is not always line 1) and to know which columns to keep.
CSV_HEADERS = [
  'Transaction Number',
  'Date',
  'Description',
  'Memo',
  'Amount Debit',
  'Amount Credit',
  'Balance',
  'Check Number',
  'Fees'
].freeze

# Description substring => memo value. Ported from `_apply_memo_rules`.
MEMO_RULES = [
  ['ADVS ED SERV PPD/STUDNTLOAN', 'Aidvantage'],
  ['JPMorgan Chase/Ext Trnsfr', 'JPMorgan Chase']
].freeze

# Port of `find_header_position`: bank exports have preamble lines above the
# header, so scan for the line containing at least (headers - 2) of the expected
# headers. Falls back to line index 2 (the historical default).
def find_header_position(lines)
  lines.each_with_index do |line, i|
    found = CSV_HEADERS.count { |h| line.downcase.include?(h.strip.downcase) }
    return i if found >= CSV_HEADERS.length - 2
  end

  raise 'File is shorter than expected and no headers found.' if lines.length <= 2

  2
end

# Normalize a CSV header to its DB column name: strip, spaces -> underscores,
# lowercase (port of `_add_default_columns`' normalization + `_normalize_columns`).
def normalize_header(header)
  header.to_s.strip.gsub(/\s+/, '_').downcase
end

def to_float(value)
  return nil if value.nil? || value.to_s.strip.empty?

  Float(value.to_s.delete(',').strip)
rescue ArgumentError
  nil
end

def parse_date(value)
  return nil if value.nil? || value.to_s.strip.empty?

  Time.zone.parse(value.to_s.strip)
rescue ArgumentError
  nil
end

# Parse one CSV file's content into transaction attribute hashes.
def parse_transactions(content, user_id, source_key)
  lines = content.lines
  return [] if lines.length < 2

  header_position = find_header_position(lines)
  table = CSV.parse(lines[header_position..].join, headers: true, liberal_parsing: true)

  now = Time.current
  rows = []

  table.each do |row|
    description = row['Description']
    memo = row['Memo']

    # Apply memo rules (description substring => canonical memo).
    MEMO_RULES.each do |pattern, memo_value|
      memo = memo_value if description.to_s.include?(pattern)
    end

    date = parse_date(row['Date'])
    next if date.nil? # `_process_dates` drops rows with unparseable dates

    amount_debit = to_float(row['Amount Debit'])

    rows << {
      transaction_number: row['Transaction Number']&.strip,
      date: date,
      description: description,
      # Business-key normalization: NULL memo -> '' and NULL amount_debit -> 0,
      # so Postgres' "NULLs are distinct" behavior doesn't defeat the unique key.
      memo: memo.nil? ? '' : memo.strip,
      memo_id: nil,
      amount_debit: amount_debit.nil? ? 0.0 : amount_debit,
      amount_credit: to_float(row['Amount Credit']),
      balance: to_float(row['Balance']),
      check_number: to_float(row['Check Number']),
      fees: to_float(row['Fees']),
      budget_category: nil,
      user_id: user_id,
      created_at: now,
      updated_at: now
    }
  end

  Rails.logger.info("Parsed #{rows.length} rows from #{source_key}")
  rows
end

# --- Resolve the ingest user (transactions.user_id is NOT NULL) --------------
bucket_name = ENV['TRANSACTIONS_BUCKET']
raise 'TRANSACTIONS_BUCKET is not set (see config/local_env.yml.example)' if bucket_name.to_s.empty?

ingest_user =
  if ENV['INGEST_USER_ID'].present?
    User.find(ENV['INGEST_USER_ID'])
  else
    User.find_or_create_by!(username: 'seed_ingest') do |u|
      u.email = 'seed@example.com'
      u.password = 'seed-placeholder'
    end
  end

puts "Seeding transactions from s3://#{bucket_name} for user_id=#{ingest_user.id}..."

# --- Pull every CSV object, parse, and dedupe on the business key ------------
s3 = Aws::S3::Resource.new
records = []
seen = {}

s3.bucket(bucket_name).objects.each do |obj|
  next unless obj.key.end_with?('.csv')

  content = obj.get.body.read.force_encoding('UTF-8')
  parse_transactions(content, ingest_user.id, obj.key).each do |row|
    key = row.values_at(*Transaction::BUSINESS_KEY)
    next if seen[key] # keep first occurrence, like the ingester's dedupe

    seen[key] = true
    records << row
  end
end

puts "Parsed #{records.length} unique transactions. Importing..."

# Idempotent import: skip rows already present under the business-key unique index.
result = Transaction.import(
  records,
  on_duplicate_key_ignore: { conflict_target: Transaction::BUSINESS_KEY },
  validate: false
)

puts "Imported #{result.ids.length} new transactions (#{records.length - result.ids.length} already existed)."
