class AddColumnMunicipalCodeToProperties < ActiveRecord::Migration[7.0]
  def change
    add_column :properties, :municipal_code, :string
  end
end
