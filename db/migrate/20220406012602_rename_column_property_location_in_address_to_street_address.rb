class RenameColumnPropertyLocationInAddressToStreetAddress < ActiveRecord::Migration[7.0]
  def change
    rename_column :addresses, :property_location, :street_address
  end
end
