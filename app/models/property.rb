class Property < ApplicationRecord
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true
  # Does property really have one address, if another address exists on the record?
  has_one :address
  has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false

  after_initialize :ensure_property_full_address,
                   :ensure_owner_full_mailing_address,
                   :ensure_property_has_gcode,
                   :ensure_latitude,
                   :ensure_longitude

  def self.search(search)
    search = search.upcase
    if search
        Property.where("owner_name LIKE ?", "%#{search}%")
    else
        all
    end
  end

  def difference_between_addresses?
    owner_mailing_address != street_address
  end

  # returns the difference between addresses if the difference exists
  def address_difference
    diff = street_address.split - owner_mailing_address.split
    if diff.length > 0
      diff
    else "addresses are the same"     end
  end

  # getting the municipality of the particular property record
  def get_municipality
    # the type on the Geocoder.search result varies; sometimes its a town, othertimes its a city
    # Moreover this is does not capture the municipal code but it should
    # there is no gaurentee that the city of city_state_zip is the same as the municipality of the property
    # this might ultimately wind up being an instance for a concern

    # this won't always return a ["town"], sometimes it will return ["city"]
    # if it returns ["hamlet"], get the next attribute
    address = Geocoder.search(city_state_zip)[0].data["address"]
    if address["town"].nil?
      address["city"]
    else
      address["town"]
    end
  end

  private

  def ensure_owner_full_mailing_address
    if owner_full_mailing_address.nil?
      self.owner_full_mailing_address = [owner_mailing_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_property_full_address
    if property_full_address.nil?
      self.property_full_address = [street_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_latitude
    if latitude.nil?
      self.latitude = Geocoder.search(property_full_address)[0].data["lat"]
    end
  end

  def ensure_longitude
    if longitude.nil?
      self.longitude = Geocoder.search(property_full_address)[0].data["lon"]
    end
  end

  def ensure_property_has_gcode
    if g_code.nil?
      self.g_code = Geocoder.search(property_full_address)[0].data["display_name"]
    end
  end

  def owner_full_mailing_address_gcode
    Geocoder.search(owner_full_mailing_address)[0].data["address"]
  end

end
