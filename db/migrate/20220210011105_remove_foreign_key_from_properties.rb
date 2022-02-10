class RemoveForeignKeyFromProperties < ActiveRecord::Migration[7.0]
  def change
    remove_column :properties, :landlords_id
  end
end
