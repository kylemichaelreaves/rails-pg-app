class CreateJoinTableBetweenPropertiesAndAddresses < ActiveRecord::Migration[7.0]
  def change
    create_join_table :properties, :addresses do |t|
      t.index [:property_id, :address_id]
      t.index [:address_id, :property_id]
    end
  end
end
