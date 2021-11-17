class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :street_address
      t.string :owner_name
      t.string :owner_mailing_address
      t.string :city_state_zip
      t.string :property_full_address
      t.int :number_properties_owned
      t.int :units_at_property
      t.text :list_properties_owned
      t.text :g_code
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
