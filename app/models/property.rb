class Property < ApplicationRecord
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true
  # Does property really have one address, if another address exists on the record?
  has_one :address
  has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false, join_table: "properties_landlords"

  after_initialize :ensure_property_full_address,
                   :ensure_owner_full_mailing_address,
                   :ensure_property_has_gcode,
                   :ensure_latitude,
                   :ensure_longitude

  scope :search_by_name, ->(name) {
          name.upcase
          where("name LIKE ?", "%#{name}%")
        }

  # does the landlord live elsewhere?
  def landlord_lives_elsewhere
    owner_mailing_address != street_address && owner_full_mailing_address != property_street_address
  end

  # returns the difference between addresses if the difference exists
  def address_difference
    diff = street_address.split - owner_mailing_address.split
    if diff.length > 0
      diff
    else "addresses are the same"     end
  end

  # there is no gaurentee that the city of city_state_zip is the same as the municipality of the property
  # this function does not capture the municipal code but it should … somehow … and it will … someday
  # getting the municipality of the particular property record
  def get_municipality
    # the keys on the Geocoder.search result varies; sometimes its a "town", othertimes its a "city"

    address = Geocoder.search(city_state_zip)[0].data["address"]
    if address["town"].nil?
      address["city"]
    else
      address["town"]
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
    result = Geocoder.search(property_full_address)
    if result
      if result.first
        if result.first.latitude
          self.latitude = result.first.latitude if latitude.nil?
        end
      end
    end
  end

  def ensure_longitude
    result = Geocoder.search(property_full_address)
    if result
      if result.first
        if result.first.longitude
          self.longitude = Geocoder.search(property_full_address).first.longitude if longitude.nil?
        end
      end
    end
  end

  def ensure_property_has_gcode
    result = Geocoder.search(property_full_address)
    if result
      if result.first
        if result.first.display_name
          self.g_code = Geocoder.search(property_full_address).first.display_name if g_code.nil?
        end
      end
    end
  end

  def owner_full_mailing_address_gcode
    result = Geocoder.search(owner_full_mailing_address)
    if result
      if result.first
        if result.first.display_name
          self.owner_full_mailing_address_gcode = result.first.display_name if owner_full_mailing_address_gcode.nil?
        end
      end
    end
  end

  def ensure_address_exists_for_property
    if addresses_id.nil?
      # create new Address record
      address = Address.find_or_initialize_by(street_address: Property.street_address,
                                              municipality: get_municipality,
                                              state: city_state_zip.split(",")[1],
                                              zipcode: city_state_zip.split(",")[2],
                                              latitude: latitude,
                                              longitude: longitude,
                                              latitude_and_longitude: [latitude, longitude].compact.join(", "))
      # update self to include the addresses_id
      self.addresses_id = address.id
    end
  end

  def ensure_landlord_exists_for_property
    if landlords_id.nil?
      # create Landlords record
      landlord = Landlord.create!(name: owner_name,
                                  full_mailing_address: owner_full_mailing_address,
                                  g_code: owner_full_mailing_address_gcode)
      # update self to include the landlords_id
      self.landlords_id = landlord.id
    end
  end
end
