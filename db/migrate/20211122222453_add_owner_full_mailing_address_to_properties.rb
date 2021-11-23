class AddOwnerFullMailingAddressToProperties < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :owner_full_mailing_address, :string
  end
end
