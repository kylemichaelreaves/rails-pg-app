class Address < ApplicationRecord

  # an Address is intended to be a destrucuring of city_state_zip in Property.rb
  # it's meant to provide everything needed to geocode an address
  # they're meant to be UNIQUE: no two records full_address should be the same
  # they should also have coordinates (a latitude and longitude)
  # those coordinates should be unique as well

  validates :street_address, :municipality, :state, :zipcode, presence: true
  validates :full_address, uniqueness: true
  validates :latitude_and_longitude, uniqueness: true

  belongs_to :property
  # belongs_to :landlord
  has_many :landlords, through: :properties

  after_initialize :ensure_latitude_and_longitude

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def self.search_by_street_address(street_address)
    where(street_address: street_address)
  end

  def self.search_by_municipality(municipality)
    where(municipality: municipality)
  end

  def self.search_by_state(state)
    where(state: state)
  end

  def self.search_by_zipcode(zipcode)
    where(zipcode: zipcode)
  end

  def self.search_by_latitude_and_longitude(latitude, longitude)
    where(latitude: latitude, longitude: longitude)
  end

  def self.search_by_full_address(full_address)
    where(full_address: full_address)
  end

  def self.search_by_property_id(property_id)
    where(property_id: property_id)
  end

  def self.search_by_landlord_id(landlord_id)
    where(landlord_id: landlord_id)
  end

  def self.search_by_landlord_name(landlord_name)
    landlords = Landlord.where(name: landlord_name)
    landlords.map { |landlord| landlord.addresses }
  end

  def self.search_by_landlord_mailing_address(landlord_mailing_address)
    landlords = Landlord.where(mailing_address: landlord_mailing_address)
    landlords.map { |landlord| landlord.addresses }
  end

  def self.search_by_landlord_city_state_zip(landlord_city_state_zip)
    landlords = Landlord.where(city_state_zip: landlord_city_state_zip)
    landlords.map { |landlord| landlord.addresses }
  end

  def self.search_by_landlord_full_mailing_address(landlord_full_mailing_address)
    landlords = Landlord.where(full_mailing_address: landlord_full_mailing_address)
    landlords.map { |landlord| landlord.addresses }
  end

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
