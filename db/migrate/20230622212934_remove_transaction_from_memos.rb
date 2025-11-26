class RemoveTransactionFromMemos < ActiveRecord::Migration[7.0]
  def change
    remove_reference :memos, :transaction, null: false, foreign_key: true
  end
end
