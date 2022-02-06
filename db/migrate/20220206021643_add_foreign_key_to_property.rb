class AddForeignKeyToProperty < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :property, foreign_key: true
  end
end
