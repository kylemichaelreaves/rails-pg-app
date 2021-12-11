class AddingReferencesBetweenPropertyAndLandlord < ActiveRecord::Migration[6.1]
  def change
    change_table :properties do |t|
      t.references :landlords, foreign_key: { to_table: :landlords }
    end

    change_table :landlords do |t|
      t.integer "list_property_ids_of_owned", array: true
    end

  end
end
