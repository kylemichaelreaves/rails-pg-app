class DropJoinTablesAndRecreateThem < ActiveRecord::Migration[7.0]
  def change
    # drop join tables landlords_properties
    drop_table :landlords_properties
    # drop join tables properties_addresses
    drop_table :properties_addresses

    # recreate join tables landlords_properties
    create_join_table :landlords, :properties do |t|
      t.index :landlord_id
      t.index :property_id
    end

    # recreate join tables properties_addresses
    create_join_table :properties, :addresses do |t|
      t.index :property_id
      t.index :address_id
    end
  end
end
