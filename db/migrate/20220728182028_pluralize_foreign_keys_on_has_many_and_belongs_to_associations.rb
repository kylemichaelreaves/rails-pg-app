class PluralizeForeignKeysOnHasManyAndBelongsToAssociations < ActiveRecord::Migration[7.0]
  def change
    rename_column :addresses, :property_id, :properties_id
    
    rename_column :properties, :address_id, :addresses_id
    rename_column :properties, :landlord_id, :landlords_id

    # pluralize the column names of the join tables
    rename_column :landlords_properties, :landlord_id, :landlords_id
    rename_column :landlords_properties, :property_id, :properties_id
    rename_column :properties_addresses, :property_id, :properties_id
    rename_column :properties_addresses, :address_id, :addresses_id


  end
end
