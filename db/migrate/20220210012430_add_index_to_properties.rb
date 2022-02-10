class AddIndexToProperties < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.references :landlords
    end
  end
end
