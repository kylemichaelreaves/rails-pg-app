class Property < ApplicationRecord
  include PropertiesHelper
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true
  # Does a property *only* have one address, if another address exists on the record?
  has_one :address
  has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false, join_table: "properties_landlords"

  after_initialize :ensure_street_address_normalized,
                   :ensure_property_full_address,
                   :ensure_owner_full_mailing_address,
                   :ensure_gcode,
                   :ensure_latitude,
                   :ensure_longitude

  before_save :ensure_addresses_id,
              :ensure_landlords_id

  # after_find :ensure_addresses_id

  geocoded_by :property_full_address

  scope :search_by_street_address, ->(street_address) {
          street_address = street_address.upcase
          where("street_address LIKE ?", "%#{street_address}%")
        }

  scope :search_by_name, ->(name) {
          name = name.upcase
          where("owner_name LIKE ?", "%#{name}%")
        }

  # does the landlord live elsewhere?
  def landlord_lives_elsewhere
    owner_mailing_address != street_address && owner_full_mailing_address != property_street_address
  end

  # there is no gaurentee that the city of city_state_zip is the same as the municipality of the property
  # this function does not capture the municipal code but it should … somehow … and it will … someday
  # getting the municipality of the particular property record
  def get_municipality
    # the keys on the Geocoder.search result varies; sometimes its a "town", othertimes its a "city"
    # use a generic name to avoid ambiguity
    result = Geocoder.search(city_state_zip)[0].data["address"]
    if result["town"].nil?
      result["city"]
    else
      result["town"]
    end
  end

  private

  def ensure_owner_full_mailing_address
    self.owner_full_mailing_address = [owner_mailing_address, city_state_zip].compact.join(", ") if owner_full_mailing_address.nil?
  end

  def ensure_property_full_address
    self.property_full_address = [street_address, city_state_zip].compact.join(", ") if property_full_address.nil?
  end

  def ensure_latitude
    if latitude.nil?
      result = Geocoder.search(property_full_address)

      if result.length > 1
        # filter the results for only those that contain the municipality
        results = result.select { |property| "Jersey City".in? property.data["display_name"] }
        self.latitude = results.first.latitude
      elsif result.length == 1
        self.latitude = result.first.latitude
      end
    end
  end

  def ensure_longitude
    if longitude.nil?
      result = Geocoder.search(property_full_address)

      if result.length > 1
        # filter the results for only those that contain the municipality
        results = result.select { |property| "Jersey City".in? property.data["display_name"] }
        self.longitude = results.first.longitude
      elsif result.length == 1
        self.longitude = result.first.longitude
      end
    end
  end

  def ensure_gcode
    if g_code.nil?
      result = Geocoder.search(property_full_address)

      if result.length > 1
        # filter the results for only those that contain the municipality
        results = result.select { |property| "Jersey City".in? property.data["display_name"] }
        self.g_code = results.first.display_name
      elsif result.length == 1
        self.g_code = result.first.display_name
      end
    end
  end

  def ensure_addresses_id
    if addresses_id.nil?
      g_code_split = g_code.split(",")

      new_address = Address.find_or_create_by(
        street_address: street_address,
        municipality: "Jersey City",
        state: "New Jersey",
        zipcode: g_code_split[-2].scan(/\d/).join("").strip,
        properties_id: self.id,
      )

      update!(addresses_id: new_address.id)
    end
  end

  def ensure_landlords_id
    if landlords_id.nil?
      new_landlord = Landlord.find_or_create_by(name: owner_name,
                                                mailing_address: owner_mailing_address,
                                                city_state_zip: city_state_zip)

      update!(landlords_id: new_landlord.id)
    end
  end

  def ensure_street_address_normalized
    new_address = street_address.split
      .map { |el| STREET_ADDRESS_HASH[el] || el }
      .join(" ")

    update!(street_address: new_address.id)
  end
end
