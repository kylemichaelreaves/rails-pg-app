class AddUniqueIndexOnLandlordsAndAddresses < ActiveRecord::Migration[7.0]
  def change
    add_index :addresses, :latitude_and_longitude, unique: true
    add_index :addresses, :full_address, unique: true
    add_index :landlords, :name, unique: true
  end
end
