class RemoveLandlordsTypeColumnFromProperties < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.remove :landlords_id
      t.remove :landlords_type
    end
  end
end
