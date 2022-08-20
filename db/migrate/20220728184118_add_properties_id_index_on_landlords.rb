class AddPropertiesIdIndexOnLandlords < ActiveRecord::Migration[7.0]
  def change
    add_reference :landlords, :properties, index: true, foreign_key: true
  end
end
