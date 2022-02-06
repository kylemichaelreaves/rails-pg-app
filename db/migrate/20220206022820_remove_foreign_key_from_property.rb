class RemoveForeignKeyFromProperty < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.remove :property_id
    end
    change_table :landlords do |t|
      t.remove :properties_id
    end
  end
end
