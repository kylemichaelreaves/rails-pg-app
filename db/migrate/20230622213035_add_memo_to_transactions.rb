class AddMemoToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_reference :transactions, :memo, null: false, foreign_key: true
  end
end
