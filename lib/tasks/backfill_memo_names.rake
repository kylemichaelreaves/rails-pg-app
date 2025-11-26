namespace :db do
  desc 'Backfill memo column with memo names from memo_id association'
  task backfill_memo_names: :environment do
    puts 'Starting backfill of memo names...'

    # Count transactions needing update
    null_count = Transaction.where("memo IS NULL OR memo = ''").count
    puts "Found #{null_count} transactions with NULL memo column"

    if null_count == 0
      puts 'Nothing to update!'
      next
    end

    # Use SQL to efficiently update all records at once
    puts 'Updating all transactions with SQL...'
    sql = <<-SQL
      UPDATE transactions 
      SET memo = memos.name 
      FROM memos 
      WHERE transactions.memo_id = memos.id 
        AND (transactions.memo IS NULL OR transactions.memo = '')
    SQL

    ActiveRecord::Base.connection.execute(sql)

    # Verify the update
    remaining_null = Transaction.where("memo IS NULL OR memo = ''").count
    updated_count = null_count - remaining_null

    puts "\n✅ Backfill complete!"
    puts "   Updated: #{updated_count} transactions"
    puts "   Remaining NULL: #{remaining_null}"

    if remaining_null > 0
      puts "\n⚠️  Warning: #{remaining_null} transactions still have NULL memo"
      puts '   These may have invalid memo_id references'
    end
  end
end

