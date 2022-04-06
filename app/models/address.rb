class Address < ApplicationRecord
    validates :street_address, :municipality, :state, :zipcode presence: true


end
