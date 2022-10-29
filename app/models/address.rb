class Address < ApplicationRecord
  validates :street_address, :municipality, :state, :zipcode, presence: true
  # a full address might include an apt number, but they'll all have the same coordinates
  # so we only need to validate the uniqueness of the concatenated coordinates string
  validates :latitude_and_longitude, uniqueness: true

  has_and_belongs_to_many :properties
  has_and_belongs_to_many :landlords

  before_create :ensure_full_address,
                :ensure_latitude,
                :ensure_longitude,
                :ensure_latitude_and_longitude

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  # check if the municipality matches the result of geocoded zipcode
  # geocode the zipcode and compare it to the municipality
  # TODO: check if that zipcode is in the hash in the properties_helper
  def verified_municipality?
    result = Geocoder.search(zipcode, params: { country_code: 'us', state: 'New Jersey' }).first
    result.data['address'].split(', ').first == municipality if result.present?
  end

  def concat_full_address
    [street_address, municipality, state, zipcode].compact.join(', ')
  end

  def find_properties
    Property.where(latitude: latitude, longitude: longitude)
  end

  private

  def ensure_full_address
    self.full_address = concat_full_address if full_address.nil?
  end

  def ensure_latitude
    return unless latitude.nil?

    result = Geocoder.search(full_address).first
    self.latitude = result.latitude if result.present?
  end

  def ensure_longitude
    return unless longitude.nil?

    result = Geocoder.search(full_address).first
    self.longitude = result.longitude if result.present?
  end

  def ensure_latitude_and_longitude
    self.latitude_and_longitude = [latitude, longitude].compact.join(', ') if latitude_and_longitude.nil?
  end

  def ensure_properties
    return unless properties.empty?

    found_properties = find_properties
    if found_properties.present?
      found_properties.each do |property|
        properties << property unless properties.include?(property)
      end
    else
      new_property = Property.create!(street_address:, municipality:, state: 'New Jersey', zipcode:)
      properties << new_property
    end
  end

  def ensure_landlords
    return unless landlords.empty?

    found_landlords = find_landlords
    if found_landlords.present?
      found_landlords.each do |landlord|
        landlords << landlord unless landlords.include?(landlord)
      end
    else
      new_landlord = Landlord.create!(full_name:)
      landlords << new_landlord
    end
  end
end

