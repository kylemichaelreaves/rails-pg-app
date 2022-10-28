class DropForeignIdColumnsOnTables < ActiveRecord::Migration[7.0]
  def change
    remove_column :addresses, :property_id, :bigint
    remove_column :landlords, :property_id, :bigint
    remove_column :landlords, :address_id, :bigint
    remove_column :properties, :landlord_id, :bigint
    remove_column :properties, :address_id, :bigint
  end
end
