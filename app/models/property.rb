class Property < ApplicationRecord
    belongs_to :landlord, class_name: "Landlord", foreign_key: "landlord_id"
end
