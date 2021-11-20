class CreateLandlords < ActiveRecord::Migration[6.1]
  def change
    create_table :landlords do |t|
      t.string :name
      t.string :mailing_address
      t.string :city_state_zip
<<<<<<< HEAD:db/migrate/20211117012411_create_landlords.rb
      t.string :owner_full_mailing_address
      t.integer :number_associated_properties
      t.text :associated_properties
      
=======
      t.string :full_mailing_address
      t.integer :number_properties_owned
      t.string :properties_owned, array: true
>>>>>>> parent of b9fb381 (New model: People added—others modified.):db/migrate/20211116022651_create_landlords.rb

      t.timestamps
    end
  end
end
