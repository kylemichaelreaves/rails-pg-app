class RenamedAddressesPropertiesTableToPropertiesAddresses < ActiveRecord::Migration[7.0]
  def change
    rename_table :addresses_properties, :properties_addresses
  end
end
