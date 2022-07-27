class RenameColumnsOnPropertiesAddresses < ActiveRecord::Migration[7.0]
  def change
    change_table :properties_addresses do |t|
      t.rename :address_id, :addresses_id
      t.rename :property_id, :properties_id
    end
    change_table :landlords_properties do |t|
      t.rename :landlord_id, :landlords_id
      t.rename :property_id, :properties_id
    end
  end
end
