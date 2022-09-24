class CreateJoinTableLandlordProperty < ActiveRecord::Migration[7.0]
  def change
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

    # add references on properties table
    add_reference :properties, :landlord, foreign_key: true
    add_reference :properties, :address, foreign_key: true

    # add references on addresses table
    add_reference :addresses, :landlord, foreign_key: true
    add_reference :addresses, :property, foreign_key: true

    # add references on landlords table
    add_reference :landlords, :address, foreign_key: true
    add_reference :landlords, :property, foreign_key: true

  end
end
