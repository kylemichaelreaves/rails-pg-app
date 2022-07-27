class RenameColumnsinPropertiesAddresses < ActiveRecord::Migration[7.0]
  def change
    change_table :properties_addresses do |t|
      t.rename :property_id, :properties_id
      t.rename :address_id, :addresses_id
      end
  end
end
