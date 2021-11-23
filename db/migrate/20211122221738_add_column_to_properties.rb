class AddColumnToProperties < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :list_properties_owned, :string, array:true
  end
end
