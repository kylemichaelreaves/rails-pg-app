class RemovingColumns < ActiveRecord::Migration[7.0]
  def change
   remove_column :landlords, :properties_id
  end
end
