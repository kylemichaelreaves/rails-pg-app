class DropAllForeignKeysThenAddForeignKeysToCascadeOnDelete < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :addresses, :landlords
    remove_foreign_key :addresses, :properties
    remove_foreign_key :landlords, :properties


    add_foreign_key :landlords, :properties, on_delete: :cascade, on_update: :cascade
    # add_foreign_key :landlords, :addresses, on_delete: :cascade, on_update: :cascade
    add_foreign_key :properties, :landlords, on_delete: :cascade, on_update: :cascade
    add_foreign_key :properties, :addresses, on_delete: :cascade, on_update: :cascade
    add_foreign_key :addresses, :properties, on_delete: :cascade, on_update: :cascade
    add_foreign_key :addresses, :landlords, on_delete: :cascade, on_update: :cascade

  end
end
