class PluralizeLandlordIdOnAddresses < ActiveRecord::Migration[7.0]
  def change
    rename_column :addresses, :landlord_id, :landlords_id
  end
end
