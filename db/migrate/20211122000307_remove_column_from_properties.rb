class RemoveColumnFromProperties < ActiveRecord::Migration[6.1]
  def change
    remove_column :landlords, :number_associated_properties
  end
end
