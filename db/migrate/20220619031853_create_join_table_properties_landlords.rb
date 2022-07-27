class CreateJoinTablePropertiesLandlords < ActiveRecord::Migration[7.0]
  def change
    create_join_table :properties, :landlords do |t|
      t.index [:property_id, :landlord_id]
      t.index [:landlord_id, :property_id]
    end
  end
end
