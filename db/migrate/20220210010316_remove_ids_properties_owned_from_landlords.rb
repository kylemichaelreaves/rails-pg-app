class RemoveIdsPropertiesOwnedFromLandlords < ActiveRecord::Migration[7.0]
  def change
    remove_column :landlords, :ids_properties_owned
  end
end
