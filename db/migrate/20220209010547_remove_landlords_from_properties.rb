class RemoveLandlordsFromProperties < ActiveRecord::Migration[7.0]
  def change
    change_table :properties do |t|
      t.remove :landlords_id
    end
  end
end
