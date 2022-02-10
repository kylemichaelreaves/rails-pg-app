class AddingForeignKeyToPropertiesFromLandlord < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :landlords, foreign_key: true, null: false
  end
end
