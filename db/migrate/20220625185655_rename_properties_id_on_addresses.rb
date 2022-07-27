class RenamePropertiesIdOnAddresses < ActiveRecord::Migration[7.0]
  def change
    rename_column :addresses, :properties_id, :property_id
  end
end
