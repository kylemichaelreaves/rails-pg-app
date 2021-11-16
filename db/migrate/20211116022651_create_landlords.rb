class CreateLandlords < ActiveRecord::Migration[6.1]
  def change
    create_table :landlords do |t|

      t.timestamps
    end
  end
end
