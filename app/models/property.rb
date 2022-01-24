class Property < ApplicationRecord
    belongs_to :landlord
    validates :latitude, :longitude, :g_code, presence: true
end
