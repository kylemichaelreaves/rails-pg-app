class AddingLandlordIdtoPropertyTable < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :landlords
  end
end
