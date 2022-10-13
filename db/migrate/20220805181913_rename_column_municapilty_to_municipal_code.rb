class RenameColumnMunicapiltyToMunicipalCode < ActiveRecord::Migration[7.0]
  def change
    rename_column :properties, :municipality, :municipal_code
  end
end
