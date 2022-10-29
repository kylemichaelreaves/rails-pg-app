class DropForeignKeysOnTables < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :addresses, :properties
    remove_foreign_key :landlords, :properties
    remove_foreign_key :landlords, :addresses
  end
end
