class CreateLandlords < ActiveRecord::Migration[6.1]
  def change
    create_table :landlords do |t|
      t.string :name
      t.string :mailing_address
      t.string :city_state_zip
      t.string :owner_full_mailing_address
      t.integer :number_associated_properties
      t.text :associated_properties
      t.belongs_to :properties, null: false, foreign_key: true

      t.timestamps
    end
  end
end
