class AddNameToLandlord < ActiveRecord::Migration[7.0]
  def change
      change_table :landlords do |t|
        t.string :name
  end
end
end
