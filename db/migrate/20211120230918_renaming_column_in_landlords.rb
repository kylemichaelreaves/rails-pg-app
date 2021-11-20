class RenamingColumnInLandlords < ActiveRecord::Migration[6.1]
  def change
    rename_column :landlords, :properties_owned, :list_properties_owned
  end
end
