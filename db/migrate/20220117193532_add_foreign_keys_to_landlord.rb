class AddForeignKeysToLandlord < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :properties, :landlords, column: owner_name, primary_key: "name"
  end
end
