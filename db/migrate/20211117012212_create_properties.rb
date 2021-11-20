class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :street_address
      t.string :owner_name
      t.string :owner_mailing_address
      t.string :city_state_zip
      t.string :owner_full_mailing_address
      t.integer :units
      t.text :associated_properties
      t.integer :number_associated_properties
      t.text :g_code
      t.float :latittude
      t.float :longitude

      t.timestamps
    end
  end
end
