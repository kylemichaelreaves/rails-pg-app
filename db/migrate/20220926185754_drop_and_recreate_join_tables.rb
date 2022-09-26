class DropAndRecreateJoinTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :addresses_properties
    drop_table :landlords_properties
    drop_table :addresses_landlords

    create_join_table :landlords, :properties do |t|
      t.index :landlord_id
      t.index :property_id
    end

    create_join_table :addresses, :properties do |t|
      t.index :address_id
      t.index :property_id
    end

    create_join_table :addresses, :landlords do |t|
      t.index :address_id
      t.index :landlord_id
    end

  end
end
