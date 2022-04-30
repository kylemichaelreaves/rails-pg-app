class Property < ApplicationRecord
    validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

    has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false
end
