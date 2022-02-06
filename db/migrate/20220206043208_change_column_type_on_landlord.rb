class ChangeColumnTypeOnLandlord < ActiveRecord::Migration[7.0]
  def change
    change_table :landlords do |t|
      t.remove :ids_properties_owned
    end
  end
end
