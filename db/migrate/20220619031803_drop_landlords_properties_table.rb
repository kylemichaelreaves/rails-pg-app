class DropLandlordsPropertiesTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :landlords_properties
  end
end
