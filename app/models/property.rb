class Property < ApplicationRecord
    belongs_to :landlord, class_name: "Landlord", foreign_key: "landlords_id"
    validates :latitude, :longitude, :g_code, presence: true
end
