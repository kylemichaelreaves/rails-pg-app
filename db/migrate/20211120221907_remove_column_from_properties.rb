class RemoveColumnFromProperties < ActiveRecord::Migration[6.1]
  def change
    remove_column :properties, :number_properties_owned
  end
end
