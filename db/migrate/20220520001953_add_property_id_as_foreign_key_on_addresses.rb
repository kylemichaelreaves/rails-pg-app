class AddPropertyIdAsForeignKeyOnAddresses < ActiveRecord::Migration[7.0]
  def change
    add_reference :addresses, :properties, foreign_key: true, column: :property_id
  end
end
