class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string :name
      t.integer :age
      t.date :born
      t.date :died
      t.string :birthplace
      t.string :diedplace

      t.timestamps
    end
  end
end
