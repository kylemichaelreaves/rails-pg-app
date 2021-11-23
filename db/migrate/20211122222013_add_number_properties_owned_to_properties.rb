class AddNumberPropertiesOwnedToProperties < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :number_properties_owned, :integer
  end
end
