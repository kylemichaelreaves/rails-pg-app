class AddPropertiesIdToAddresses < ActiveRecord::Migration[7.0]
  def change
    add_reference :addresses, :properties, index: true, foreign_key: true
  end
end
