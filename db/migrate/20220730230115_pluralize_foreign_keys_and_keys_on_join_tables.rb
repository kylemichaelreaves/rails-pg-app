class PluralizeForeignKeysAndKeysOnJoinTables < ActiveRecord::Migration[7.0]
  def change
    # pluralize the foreign keys on properties
    rename_column :properties, :landlord_id, :landlords_id
    rename_column :properties, :address_id, :addresses_id

    # pluralize the foreign keys on landlords
    rename_column :landlords, :property_id, :properties_id

    # pluralize the foreign keys on addresses
    rename_column :addresses, :property_id, :properties_id
  end
end
