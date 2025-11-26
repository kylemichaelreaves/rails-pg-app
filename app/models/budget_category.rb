# frozen_string_literal: true

# represents parts of the budget, has many transactions or memos
class BudgetCategory < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_many :transactions

end
