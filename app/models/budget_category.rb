class BudgetCategory < ApplicationRecord
  belongs_to :user

  validates :data, presence: true
  validates :user_id, uniqueness: true
end
