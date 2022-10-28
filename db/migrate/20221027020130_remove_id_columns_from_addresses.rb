class RemoveIdColumnsFromAddresses < ActiveRecord::Migration[7.0]
  def change
    remove_column :addresses, :landlord_id, :bigint
    remove_column :addresses, :properties_id, :bigint
  end
end
