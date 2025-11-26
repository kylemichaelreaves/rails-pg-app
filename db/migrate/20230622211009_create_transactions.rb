class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.text :transaction_number
      t.datetime :date
      t.text :description
      t.decimal :amount_debit
      t.decimal :amount_credit
      t.decimal :fees
      t.decimal :balance
      t.text :check_number

      t.timestamps
    end
  end
end
