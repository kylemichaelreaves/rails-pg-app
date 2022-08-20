class ChangeColumnNullOnJoinTables < ActiveRecord::Migration[7.0]
  def change
    # change null columns on landlords_properties
    change_column_null :landlords_properties, :property_id, false
    change_column_null :landlords_properties, :landlord_id, false

    # change null columns on addresses_landlords
    change_column_null :addresses_landlords, :address_id, false
    change_column_null :addresses_landlords, :landlord_id, false

  end
end
