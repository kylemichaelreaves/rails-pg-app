class Address < ApplicationRecord

  # an Address is intended to be a destrucuring of city_state_zip in Property.rb
  # they're meant to be UNIQUE: no two records full_address should be the same
  # A Property can have at most two Addresses: one for the owners_full_mailing_address and one for property_full_address
  # an Address should have unique coordinates (latitude and longitude)

  # There can be a special subtype of address, associated to a landlord as a mailing address

  validates :street_address, :municipality, :state, :zipcode, presence: true
  validates :full_address, uniqueness: true
  validates :latitude_and_longitude, uniqueness: true

  belongs_to :property
  has_many :landlords, through: :properties

  after_initialize :ensure_latitude_and_longitude

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end

  private

  def ensure_latitude_and_longitude
    if latitude_and_longitude.nil?
      self.latitude_and_longitude = [latitude, longitude].compact.join(", ")
    end
  end
end
