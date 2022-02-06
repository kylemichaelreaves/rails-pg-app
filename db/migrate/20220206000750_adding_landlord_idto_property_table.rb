class AddingLandlordIdtoPropertyTable < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :landlords, foreign_key: true
  end
end
