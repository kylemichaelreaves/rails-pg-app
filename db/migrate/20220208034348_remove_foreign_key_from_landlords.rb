class RemoveForeignKeyFromLandlords < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :landlords, column: :properties_id
  end
end
