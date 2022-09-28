class Address < ApplicationRecord
  validates :street_address, :municipality, :state, :zipcode, presence: true
  # a full address might include an apt number, but they'll all have the same coordinates
  # so we only need to validate the uniqueness of the concatenated coordinates string
  validates :latitude_and_longitude, uniqueness: true

  has_and_belongs_to_many :properties, foreign_key: "property_id", null: false, join_table: "addresses_properties", dependent: :destroy
  has_and_belongs_to_many :landlords, foreign_key: "landlord_id", null: false, join_table: "landlords_properties", dependent: :destroy

  before_create :verify_municipality,
                :ensure_full_address,
                :ensure_latitude,
                :ensure_longitude,
                :ensure_latitude_and_longitude
  #  :ensure_properties_id

  # after_find :ensure_properties_id #, :ensure_landlords_id

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  # check if the municipality and matches the result of geocoded zipcode
  # geocode the zipcode and compare it to the municipality
  def verified_municipality?
    result = Geocoder.search(self.zipcode, params: { country_code: "us", state: "New Jersey" }).first
    result.data['address'].split(", ").first == self.municipality if result.present?
  end

  def concat_full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end

  private

  def ensure_full_address
    self.full_address = concat_full_address if full_address.nil?
  end

  def ensure_latitude
    if latitude.nil?
      result = Geocoder.search(full_address).first
      self.latitude = result.latitude if result.present?
    end
  end

  def ensure_longitude
    if longitude.nil?
      result = Geocoder.search(full_address).first
      self.longitude = result.longitude if result.present?
    end
  end

  def ensure_latitude_and_longitude
    self.latitude_and_longitude = [latitude, longitude].compact.join(", ") if latitude_and_longitude.nil?
  end

  def ensure_properties_id
    if property_id.nil?
      # is there an property whose property_full_address matches an address's full_address?
      # property = Property.where(property_full_address: full_address)
      #   update(properties_id: property.pluck(:id))
      # create new Property record
      property = Property.find_or_create_by!(street_address: street_address)

      # update self to include the properties_id
      # self.properties_id = property.id
      update(properties_id: property.id) if property.present?
    end
  end

  def ensure_landlords_id
    if landlord_id.nil?
      id = landlords.first.id
      update(landlords_id: id)
    end
  end
end

