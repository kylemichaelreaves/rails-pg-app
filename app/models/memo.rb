# frozen_string_literal: true

# Memos are essentially vendors
class Memo < ApplicationRecord
  has_many :transactions

  validates :name, uniqueness: true, presence: true

  def total_amount_debit
    transactions.sum(:amount_debit)
  end

  def total_amount_credit
    transactions.sum(:amount_credit)
  end

  def total_transactions
    transactions.count
  end

end
