class RemoveForeignKeysOnPropertiesLandlordsAndAddresses < ActiveRecord::Migration[7.0]
  def change
    #  remove the foreign keys on all the tables
    #  remove the foreign keys from properties
    remove_foreign_key :properties, :landlords
    remove_foreign_key :properties, :addresses

    #  remove the foreign keys from landlords
    remove_foreign_key :landlords, :properties
    remove_foreign_key :landlords, :addresses

    #  remove the foreign keys from addresses
    remove_foreign_key :addresses, :properties
    remove_foreign_key :addresses, :landlords

    # destroy the join tables
    drop_table :addresses_properties
    drop_table :landlords_properties
    drop_table :addresses_landlords

    #  add the foreign keys on properties, landlords, and addresses
    add_foreign_key :properties, :landlords, on_delete: :cascade
    add_foreign_key :properties, :addresses, on_delete: :cascade

    add_foreign_key :landlords, :properties, on_delete: :cascade
    add_foreign_key :landlords, :addresses, on_delete: :cascade

    add_foreign_key :addresses, :properties, on_delete: :cascade
    add_foreign_key :addresses, :landlords, on_delete: :cascade

    # create the join tables
    create_join_table :addresses, :properties
    create_join_table :landlords, :properties
    create_join_table :addresses, :landlords

  end

end
