class CreateJoinTableLandlordsProperties < ActiveRecord::Migration[7.0]
  def change
    create_join_table :landlords, :properties do |t|
      t.index [:landlord_id, :property_id]
      t.index [:property_id, :landlord_id]
    end
  end
end
