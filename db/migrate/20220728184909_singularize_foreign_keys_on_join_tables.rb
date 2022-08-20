class SingularizeForeignKeysOnJoinTables < ActiveRecord::Migration[7.0]
  def change
    # add landlord_id to addresses
    add_reference :addresses, :landlord, index: true, foreign_key: true

    # create jointable of addresses and landlords
    create_table :addresses_landlords, id: false do |t|
      t.references :address, index: true, foreign_key: true
      t.references :landlord, index: true, foreign_key: true
    end
    

    change_table :properties_addresses do |t|
      t.rename :properties_id, :property_id
    end
    change_table :landlords_properties do |t|
      t.rename :landlords_id, :landlord_id
      t.rename :properties_id, :property_id
    end
  end
end
