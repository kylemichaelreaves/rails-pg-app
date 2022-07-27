class RenameColumnsOnJoinTables < ActiveRecord::Migration[7.0]
  def change
    change_table :properties_addresses do |t|
      t.rename :addresses_id, :address_id
      t.rename :properties_id, :property_id
    end
    change_table :landlords_properties do |t|
      t.rename :landlords_id, :landlord_id
      t.rename :properties_id, :property_id
    end
  end
end
