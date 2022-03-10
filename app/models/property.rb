class Property < ApplicationRecord
    validates :street_address, :owner_name, presence: true
    validates :owner_name, presence: true
    validates :owner_mailing_address, presence: true
    validates :city_state_zip, presence: true

    has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false
end
