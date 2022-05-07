class AddAddressIdOnProperties < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :addresses, index: true, foreign_key: true
  end
end
