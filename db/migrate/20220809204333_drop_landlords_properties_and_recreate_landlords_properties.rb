class DropLandlordsPropertiesAndRecreateLandlordsProperties < ActiveRecord::Migration[7.0]
  def change
    drop_table :landlords_properties

    create_join_table :landlords, :properties do |t|
      t.index :landlord_id
      t.index :property_id
    end
  end
end
