class AddAssociationToProperty < ActiveRecord::Migration[6.1]
  def change
    add_reference :properties, :landlord, index: true, foreign_key: true
  end
end
