class RenameForeignKeysOnPropertiesLandlordsAndAddresses < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.rename :landlords_id, :landlord_id
      t.rename :addresses_id, :address_id
    end

    change_table :landlords do |t|
      t.rename :properties_id, :property_id
    end

    change_table :addresses do |t|
      t.rename :properties_id, :property_id
      t.rename :landlords_id, :landlord_id
    end


  end
end
