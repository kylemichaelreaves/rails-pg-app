class Property < ApplicationRecord
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

  has_one :address
  has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false

  after_initialize :ensure_property_full_address,
                   :ensure_owner_full_mailing_address,
                   :ensure_property_has_gcode,
                   :ensure_latitude,
                   :ensure_longitude

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

  def get_municipality
    # this is does not capture the municipal code but it should
    # this might ultimately wind up being an instance for a concern
    Geocoder.search(city_state_zip)[0].data["address"]["town"]
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

  def ensure_longtiude
    if longitude.nil?
      self.longitude = Geocoder.search(property_full_address)[0].data["log"]
    end
  end

  def ensure_property_has_gcode
    if g_code.nil?
      self.g_code = Geocoder.search(property_full_address)[0].data["display_name"]
    end
  end
end
