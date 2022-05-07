class AddNewColumnLatitudeAndLongitudeOnAddressWithAUniqueConstraint < ActiveRecord::Migration[7.0]
  def change
    add_column :addresses, :latitude_and_longitude, :string, unique: true
  end
end
