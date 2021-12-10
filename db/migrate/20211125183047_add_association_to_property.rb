class AddAssociationToProperty < ActiveRecord::Migration[6.1]
  def change
    add_reference :landlord, :properties, null: false, index: true, foreign_key: true
  end
end
