class RemoveOwnerFullMaildingAddressFromLandlords < ActiveRecord::Migration[6.1]
  def change
    remove_column :landlords, :owner_full_mailing_address
  end
end
