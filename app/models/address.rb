class Address < ApplicationRecord

  # an Address is intended to be a destrucuring of city_state_zip in Property.rb
  # they're meant to be UNIQUE: no two records full_address should be the same

  validates :street_address, :municipality, :state, :zipcode, presence: true

  belongs_to :property

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end
end
