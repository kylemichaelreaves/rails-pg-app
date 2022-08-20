class SingularizeForeignKeysOnProperties < ActiveRecord::Migration[7.0]
  def change
    # singularize the foreign keys on the properties table
    change_table :properties do |t|
      t.rename :addresses_id, :address_id
      t.rename :landlords_id, :landlord_id
    end

    # singularize the address_id foreign key on the properties_addresses table
    change_table :properties_addresses do |t|
      t.rename :addresses_id, :address_id
    end

    # singularize the properties_id foreign key on addresses table
    change_table :addresses do |t|
      t.rename :properties_id, :property_id
    end

    # singularize the properties_id on the landlords table
    change_table :landlords do |t|
      t.rename :properties_id, :property_id
    end
  end
end
