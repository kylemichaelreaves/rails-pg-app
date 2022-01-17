class RemoveLandlordIdFromProperties < ActiveRecord::Migration[7.0]
  def change
    remove_column :properties, :landlord_id, :bigint
  end
end
