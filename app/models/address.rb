class Address < ApplicationRecord
  validates :street_address, :municipality, :state, :zipcode, presence: true

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end
end
