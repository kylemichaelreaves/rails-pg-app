#!/usr/bin/env ruby
# Quick test to verify seeding results

require_relative 'config/ig/environment'

ConsoleLogger.section('Seeding Verification Report') do
  # Count totals
  total_transactions = Transaction.count
  total_memos = Memo.count
  transactions_with_memo = Transaction.where.not(memo_id: nil).count
  transactions_without_memo = Transaction.where(memo_id: nil).count

  ConsoleLogger.info("Total Transactions: #{total_transactions}")
  ConsoleLogger.info("Total Memos: #{total_memos}")
  ConsoleLogger.info("Transactions with memo_id: #{transactions_with_memo}")
  ConsoleLogger.info("Transactions with NULL memo_id: #{transactions_without_memo}")
  ConsoleLogger.info('')

  # Check for future dates
  today = Date.new(2025, 10, 28)
  future_transactions = Transaction.where('date > ?', today).count
  ConsoleLogger.info("Future transactions (after Oct 28, 2025): #{future_transactions}")
  ConsoleLogger.info('')

  # Show date range
  if total_transactions.positive?
    earliest = Transaction.order(:date).first
    latest = Transaction.order(:date).last
    ConsoleLogger.info('Date Range:')
    ConsoleLogger.info("  Earliest: #{earliest.date} - #{earliest.description}")
    ConsoleLogger.info("  Latest: #{latest.date} - #{latest.description}")
    ConsoleLogger.info('')
  end

  # Sample transactions
  ConsoleLogger.info('Sample Transactions (last 5):')
  Transaction.order(:id).last(5).each do |t|
    memo_name = t.memo ? t.memo.name : 'NULL'
    ConsoleLogger.info("  #{t.transaction_number} | #{t.date} | Memo ID: #{t.memo_id} | #{memo_name}")
  end
  ConsoleLogger.info('')

  # Check if any memos have transactions
  ConsoleLogger.info('Memo with most transactions:')
  memo = Memo.joins(:transactions).group('memos.id').order('COUNT(transactions.id) DESC').first
  if memo
    ConsoleLogger.info("  #{memo.name}: #{memo.transactions.count} transactions")
  end

  ConsoleLogger.info('')
  ConsoleLogger.success('VERIFICATION COMPLETE')
end

