class Address < ApplicationRecord
  # an Address is intended to be a destrucuring of Property
  #     Property.street_address === Address.street_address
  #     Property.city_state_zip.split(',')[0] === Address.municipality
  #     Property.city_state_zip.split(',')[1]=== Address.state
  #     Property.city_state_zip.split(',')[2]=== Address.zipcode

  # they're  UNIQUE: no two records full_address should be the same
  # A Property can have at most two Addresses:
  # one for the owners_full_mailing_address
  # and one for property_full_address

  # an Address should have
  #   unique coordinates (latitude and longitude)
  #   unique full_address

  # There can be a special subtype of address, associated to a landlord as a mailing address

  validates :street_address, :municipality, :state, :zipcode, presence: true
  validates :full_address, :latitude_and_longitude, uniqueness: true

  belongs_to :property
  has_many :landlords, through: :properties

  after_initialize :ensure_full_address, :ensure_latitude, :ensure_longitude, :ensure_latitude_and_longitude

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def concat_full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end

  private

  def ensure_full_address
    self.full_address = concat_full_address if full_address.nil?
  end

  def ensure_latitude
    result = Geocoder.search(full_address)
    if result
      if result.first
        if result.first.latitude
          self.latitude = result.first.latitude if latitude.nil?
        end
      end
    end
  end

  def ensure_longitude
    result = Geocoder.search(full_address)
    if result
      if result.first
        if result.first.longitude
          self.longitude = Geocoder.search(full_address).first.longitude if longitude.nil?
        end
      end
    end
  end

  def ensure_latitude_and_longitude
    self.latitude_and_longitude = [latitude, longitude].compact.join(", ") if latitude_and_longitude.nil?
  end
end
