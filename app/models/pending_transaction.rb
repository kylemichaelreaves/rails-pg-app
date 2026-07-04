class PendingTransaction < ApplicationRecord
  belongs_to :user

  validates :memo, :date, :transaction_data, presence: true
  validates :status, inclusion: { in: %w[pending reviewed] }
end
