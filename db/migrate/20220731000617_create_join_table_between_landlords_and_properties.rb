class CreateJoinTableBetweenLandlordsAndProperties < ActiveRecord::Migration[7.0]
  def change
    remove_reference :properties, :addresses, foreign_key: true, index: true

    # remove foreign keys from properties_addresses

    # drop properties_addresses
    drop_table :properties_addresses
    # drop addresses_landlords
    drop_table :addresses_landlords

    # create join table landlords_properties
    create_join_table :landlords, :properties do |t|
      t.index :landlord_id
      t.index :property_id
    end

    # create join table properties_addresses
    create_join_table :properties, :addresses do |t|
      t.index :property_id
      t.index :address_id
    end

    # add foreign keys to properties and landlords
    add_reference :properties, :landlords, foreign_key: true, index: true
    # add foreign keys to properties and addresses
    add_reference :properties, :addresses, foreign_key: true, index: true
  end
end
