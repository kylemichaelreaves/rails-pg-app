class AddBudgetCategoryToTransactions < ActiveRecord::Migration[8.1]
  def change
    add_reference :transactions, :budget_category, null: true, foreign_key: true
  end
end
