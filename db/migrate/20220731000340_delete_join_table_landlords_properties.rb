class DeleteJoinTableLandlordsProperties < ActiveRecord::Migration[7.0]
  def change
    # drop join table landlords_properties and all of the foreign keys
    drop_table :landlords_properties
    remove_reference :properties, :landlords, foreign_key: true, index: true
  end
end
