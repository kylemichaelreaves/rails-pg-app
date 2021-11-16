class CreateLandlords < ActiveRecord::Migration[6.1]
  def change
    create_table :landlords do |t|
      t.string :name
      t.string :mailing_address
      t.string :city_state_zip
      t.string :full_mailing_address
      t.integer :number_properties_owned
      t.string :properties_owned, array: true

      t.timestamps
    end
  end
end
