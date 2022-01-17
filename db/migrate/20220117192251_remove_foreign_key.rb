class RemoveForeignKey < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :properties, :landlords
    remove_index :properties, :landlord_id
  end
end
