# frozen_string_literal: true

module TransactionsHelper
  # for use during seeds.rb
  class TransactionImporter
    # last day of last month in ActiveRecord format
    CUTOFF_DATE = (Date.today.beginning_of_month - 1).strftime('%Y-%m-%d').freeze
    CSV_SKIP_LINES = 3
    DATE_FORMAT = '%m/%d/%Y'

    def initialize(s3_client, bucket_name)
      @s3 = s3_client
      @bucket = bucket_name
    end

    def import_from_s3(objects)
      objects.each do |object|
        import_from_object(object.key)
      end
    end

    private

    def import_from_object(object_key)
      csv_content = fetch_csv_content(object_key)
      ConsoleLogger.info("Processing #{csv_content.lines.count} lines from #{object_key}")

      CSV.parse(csv_content, headers: true) do |row|
        import_transaction_row(row)
      end
    rescue StandardError => e
      ConsoleLogger.error("Error processing object #{object_key}: #{e.message}")
    end

    def fetch_csv_content(object_key)
      object_data = @s3.get_object(bucket: @bucket, key: object_key)
      contents = object_data.body.read
      lines = contents.lines
      lines[CSV_SKIP_LINES..].join # Skip header lines
    end

    def import_transaction_row(row)
      return if skip_empty_row?(row)

      date = parse_and_validate_date(row['Date'], row['Transaction Number'])
      return unless date

      memo = find_or_create_memo(row['Memo'])
      return unless memo

      transaction = build_transaction(row, date, memo)
      save_transaction(transaction)
    rescue StandardError => e
      ConsoleLogger.error("Error processing row: #{e.class} - #{e.message}")
      ConsoleLogger.info("Row data: #{row.to_h.values.join(',')}")
    end

    def skip_empty_row?(row)
      values = row.to_h.values
      values.all?(&:nil?) || values.all? { |v| v.to_s.strip.empty? }
    end

    def parse_and_validate_date(date_str, transaction_number)
      date_str = date_str&.strip

      if date_str.nil? || date_str.empty?
        ConsoleLogger.info("⊘ Skipping row with empty date: Transaction #{transaction_number}")
        return nil
      end

      parsed_date = Date.strptime(date_str, DATE_FORMAT)

      if parsed_date > CUTOFF_DATE
        ConsoleLogger.info("⊘ Skipping future transaction: #{transaction_number} dated #{date_str}")
        return nil
      end

      parsed_date.strftime('%Y-%m-%d')
    rescue ArgumentError => e
      ConsoleLogger.error("✗ Error parsing date for transaction: #{transaction_number}")
      ConsoleLogger.info("  Date value: '#{date_str}' (length: #{date_str&.length})")
      ConsoleLogger.info("  Error: #{e.message}")
      nil
    end

    def find_or_create_memo(memo_name)
      memo_name = memo_name.to_s.strip
      memo_name = 'Unknown' if memo_name.empty?
      memo = Memo.find_or_create_by(name: memo_name)
      unless memo.persisted? && memo.id.present?
        ConsoleLogger.error("✗ Failed to create/find memo '#{memo_name}': #{memo.errors.full_messages.join(', ')}")
        return nil
      end
      memo
    end

    def build_transaction(row, date, memo)
      Transaction.new(
        transaction_number: parse_integer(row['Transaction Number']),
        date: date,
        description: row['Description'].to_s.strip,
        memo_id: memo.id,
        amount_debit: parse_decimal(row['Amount Debit']),
        amount_credit: parse_decimal(row['Amount Credit']),
        fees: parse_decimal(row['Fees']),
        balance: parse_decimal(row['Balance']),
        check_number: parse_integer(row['Check Number'])
      ).tap do |transaction|
        transaction.write_attribute(:memo, memo.name)
      end
    end

    def parse_numeric(value, &converter)
      value = value.to_s.strip
      value.empty? ? nil : converter.call(value)
    end

    def parse_decimal(value)
      parse_numeric(value, &:to_f)
    end

    def parse_integer(value)
      parse_numeric(value, &:to_i)
    end

    def save_transaction(transaction)
      if transaction.save
        ConsoleLogger.info("✓ Transaction #{transaction.transaction_number} (#{transaction.date}) - #{transaction.read_attribute(:memo)}")
      else
        ConsoleLogger.error("✗ Failed transaction #{transaction.transaction_number}: #{transaction.errors.full_messages.join(', ')}")
      end
    end
  end
end
