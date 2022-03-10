class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :property_location
      t.string :municipality
      t.string :state
      t.integer :zipcode

      t.timestamps
    end
  end
end
