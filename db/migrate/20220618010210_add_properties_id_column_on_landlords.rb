class AddPropertiesIdColumnOnLandlords < ActiveRecord::Migration[7.0]
  def change
    add_column :landlords, :properties_id, :text, null: false, array: true, default: []
  end
end
