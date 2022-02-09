class AddLandlordIdAsForeignKeyToProperties < ActiveRecord::Migration[7.0]
  def change
    add_reference :landlords, :properties, foreign_key: true, column: :ids
  end
end
