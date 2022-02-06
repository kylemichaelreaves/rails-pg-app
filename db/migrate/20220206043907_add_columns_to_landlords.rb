class AddColumnsToLandlords < ActiveRecord::Migration[7.0]
  def change
    change_table :landlords do |t|
      t.string :mailing_address
      t.string :city_state_zip
      t.string :full_mailing_address
    end
  end
end
