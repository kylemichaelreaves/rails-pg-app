class AddReferenceFromLandlordsToProperties < ActiveRecord::Migration[7.0]
  def change
    add_reference :properties, :landlords, index: true, foreign_key: true
  end
end
