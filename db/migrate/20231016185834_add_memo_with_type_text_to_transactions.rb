class AddMemoWithTypeTextToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :memo, :text
  end
end
