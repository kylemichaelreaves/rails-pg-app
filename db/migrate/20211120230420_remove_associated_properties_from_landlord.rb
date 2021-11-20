class RemoveAssociatedPropertiesFromLandlord < ActiveRecord::Migration[6.1]
  def change
    remove_column :landlords, :associated_properties, :text
  end
end
