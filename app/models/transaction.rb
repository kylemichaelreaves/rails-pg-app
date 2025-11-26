# frozen_string_literal: true

# Transactions are things that I've bought at the store
class Transaction < ApplicationRecord
  include DateAggregatable

  belongs_to :memo
  belongs_to :budget_category, optional: true

  validates :transaction_number, presence: true

  def student_loan?
    memo.name == 'Aidvantage'
  end

  def car_loan?
    memo.name == 'JP Morgan Chase'
  end

  def self.memos_summary_for_timeframe(timeframe, date_string)
    parsed_date = TimeframeDateParser.parse(timeframe, date_string)

    select(
      'transactions.memo AS memo',
      'memos.id AS memo_id',
      'COALESCE(transactions.budget_category, memos.budget_category) AS budget_category',
      'budget_categories_flat.category_id AS budget_category_id',
      'SUM(transactions.amount_debit) AS total_amount_debit'
    )
      .joins(:memo)
      .joins('LEFT JOIN budget_categories_flat ON COALESCE(transactions.budget_category, memos.budget_category) = budget_categories_flat.full_path')
      .where('transactions.amount_debit < 0')
      .where('DATE_TRUNC(?, transactions.date) = DATE_TRUNC(?, ?)', timeframe, timeframe, parsed_date)
      .where.not(memo: nil)
      .group(
        'transactions.memo',
        'memos.id',
        'COALESCE(transactions.budget_category, memos.budget_category)',
        'budget_categories_flat.category_id'
      )
      .order('total_amount_debit')
  end

end
