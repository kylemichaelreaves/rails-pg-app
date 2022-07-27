class RenamePropertiesIdToPropertyIdsOnLandlord < ActiveRecord::Migration[7.0]
  def change
    rename_column :landlords, :properties_id, :property_ids
  end
end
