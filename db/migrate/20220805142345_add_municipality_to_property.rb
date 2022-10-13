class AddMunicipalityToProperty < ActiveRecord::Migration[7.0]
  def change
    add_column :properties, :municipality, :string
  end
end
