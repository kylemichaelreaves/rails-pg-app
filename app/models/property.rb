class Property < ApplicationRecord
  # city_state_zip DOES NOT CORRESPOND to street_address
  # city_state_zip corresponds to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

  has_one :address
  has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false

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
    Geocoder.search(city_state_zip)[0].data["address"]["town"]
  end

  private

  def ensure_owner_full_mailing_address
    if self.owner_full_mailing_address.nil?
      [owner_mailing_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_property_full_address
    if property_full_address.nil?
      [street_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_latitude_and_longitude
    if self.latitude.nil? || self.longitude.nil?
      address.geocode
    end
  end

  def ensure_property_has_gcode
    if self.g_code.nil?
      self.g_code = Geocoder.search(full_mailing_address)[0].data["display_name"]
    end
  end
end
