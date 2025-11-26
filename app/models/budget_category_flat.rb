# app/models/budget_category_flat.rb
class BudgetCategoryFlat < ApplicationRecord
  self.primary_key = :category_id

  def readonly?
    true
  end

  def self.refresh!(concurrently: true)
    command = concurrently ? 'REFRESH MATERIALIZED VIEW CONCURRENTLY' : 'REFRESH MATERIALIZED VIEW'
    connection.execute("#{command} budget_categories_flat")
  end

  scope :root_categories, -> { where(level: 1) }
  scope :by_level, ->(level) { where(level: level) }
end