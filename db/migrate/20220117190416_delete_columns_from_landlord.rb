class DeleteColumnsFromLandlord < ActiveRecord::Migration[7.0]
  def change
    remove_column :landlords, :name, :string
    remove_column :landlords, :mailing_address, :string
    remove_column :landlords, :city_state_zip, :string
    remove_column :landlords, :full_mailing_address, :string
    remove_column :landlords, :number_properties_owned, :integer
    remove_column :landlords, :list_properties_owned, :string
    remove_column :landlords, :created_at, :datetime
    remove_column :landlords, :updated_at, :datetime
    remove_column :landlords, :list_property_ids_of_owned, :integer
  end
end
