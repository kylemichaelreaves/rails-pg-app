class AddColumnToLandlords < ActiveRecord::Migration[7.0]
  def change
    change_table :landlords do |t|
      t.integer :ids_properties_owned, array: true
    end
  end
end
