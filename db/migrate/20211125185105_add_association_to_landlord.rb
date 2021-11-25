class AddAssociationToLandlord < ActiveRecord::Migration[6.1]
  def change
    add_reference :landlords, :properties, null: false, foreign_key: true, index: true
  end
end
