class ChangingPropertyAndModelTables < ActiveRecord::Migration[6.1]

  #landlords.name => properties.owner_name

  def change
    # these are not necessary in this table – they belong more to the other table
    # the names are also potentially ambiguous; a property doesn't own properties
    change_table :properties do |t|
      t.remove :list_properties_owned, :number_properties_owned
  end

  # properties_io is ambiguous and problematic
  # there can be many ids, but this assignment isn't equipped for an array of ints
    change_table :landlords do |t|
      t.remove :properties_id
    end
  end
end
