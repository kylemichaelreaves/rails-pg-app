class DropPropertyIdsFromLandlordsAndDropLandlordIdsFromProperty < ActiveRecord::Migration[7.0]
  def change
    # remove property_ids from landlords
    remove_column :landlords, :property_ids, :text, array: true, default: []
    # remove landlord_ids from properties

  end
end
