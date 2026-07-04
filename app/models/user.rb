class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_many :memos, dependent: :destroy
  has_many :pending_transactions, dependent: :destroy
  has_one :budget_category, dependent: :destroy

  validates :username, :email, :password, presence: true
end
