class RenameForeignKeysAndIndices < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.rename :landlords_id, :landlord_id
      t.rename :addresses_id, :address_id
    end
  end
end
