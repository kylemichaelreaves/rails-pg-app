class AddDataToBudgetCategories < ActiveRecord::Migration[8.1]
  def change
    add_column :budget_categories, :data, :jsonb, default: {}, null: false

    # Optional: Add GIN index for JSONB queries
    add_index :budget_categories, :data, using: :gin
  end
end
