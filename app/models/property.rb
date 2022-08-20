class Property < ApplicationRecord
  include PropertiesHelper
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :landlords, foreign_key: "landlord_id", null: false, join_table: "landlords_properties"
  has_and_belongs_to_many :addresses, foreign_key: "address_id", null: false, join_table: "addresses_properties"

  after_initialize :ensure_property_full_address,
                   :ensure_owner_mailing_address

  # before_validation :normalize_street_address

  after_validation :geocode, if: Proc.new { |obj| obj.property_full_address_changed? }

  after_validation :ensure_latitude,
                   :ensure_longitude,
                   :normalize_street_address
  #  :ensure_landlords_id
  #  :ensure_addresses_id

  # after_find :ensure_landlords_id
  #  :ensure_addresses_id
  #  :ensure_municipal_cod,

  geocoded_by :property_full_address
  reverse_geocoded_by :latitude, :longitude

  scope :search_by_street_address, ->(street_address) {
          street_address = street_address.upcase
          where("street_address LIKE ?", "%#{street_address}%")
        }

  scope :search_by_name, ->(name) {
          name = name.upcase
          where("owner_name LIKE ?", "%#{name}%")
        }

  def get_municipality
    MUNICIPAL_HASH[municipal_code]
  end

  def get_landlord
    Landlord.where(name: owner_name)
  end

  def get_address
    # try to find the address with the address_id, if it exists
    if !address_id.nil?
      Address.find(address_id)
    else
      Address.where(full_address: property_full_address)
    end
  end

  def not_in_jersey_city?
    !display_name.include?("Jersey City")
  end

  private

  def ensure_property_full_address
    if property_full_address.nil? or street_address.changed?
      self.property_full_address = [street_address, get_municipality, "New Jersey"].compact.join(", ")
    end
  end

  def ensure_owner_mailing_address
    if owner_full_mailing_address.nil?
      self.owner_full_mailing_address = [owner_mailing_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_latitude
    if latitude.nil?
      result = Geocoder.search(property_full_address)
      if result.length > 1
        results = result.select { |property| get_municipality.in? property.data["display_name"] and property.data["type"] == "residential" }
        self.latitude = results.first.latitude
      elsif result.length == 1
        self.latitude = result.first.latitude
      end
    end
  end

  def ensure_longitude
    if longitude.nil?
      result = Geocoder.search(property_full_address)
      municipality = get_municipality
      if result.length > 1
        # filter the results for only those that contain the municipality
        results = result.select { |property| municipality.in? property.data["display_name"] and property.data["type"] == "residential" }
        self.longitude = results.first.longitude
      elsif result.length == 1
        self.longitude = result.first.longitude
      end
    end
  end

  # def ensure_display_name
  #   if display_name.nil?
  #     result = Geocoder.search(property_full_address)
  #     # if there is more than one result, filter the results for only those that contain the municipality
  #     if result.length > 1
  #       results = result.select { |property| get_municipality.in? property.data["display_name"] and property.data['type'] == "residential" }
  #       self.display_name = results.first.data["display_name"]
  #     elsif result.length == 1
  #       self.display_name = result.first.data["display_name"]
  #     end
  #   end
  # end

  def get_zipcode
    Geocoder.search("#{street_address}" + ", " + "#{get_municipality}" + ", " + "New Jersey").first.postal_code
  end

  def ensure_property_full_address
    if property_full_address.nil? or self.street_address_changed?
      self.property_full_address = [street_address, get_municipality, "New Jersey"].compact.join(", ")
    end
  end

  def ensure_addresses_id
    if address_id.nil?
      zipcode = get_zipcode
      address = Address.find_by(latitude_and_longitude: latitude.to_s + ", " + longitude.to_s)
      if !address.nil?
        update!(address_id: address.id)
      else
        new_address = Address.create!(
          street_address: street_address,
          municipality: get_municipality,
          state: "New Jersey",
          zipcode: zipcode,
          # zipcode: g_code_split[-2].scan(/\d/).join("").strip,
          property_id: self.id,
        )
        update!(address_id: new_address.id)
      end
    end
  end

  def ensure_landlords_id
    if landlord_id.nil?
      landlord = Landlord.where(name: owner_name)
      if landlord.exists?
        update!(landlord_id: landlord.first.id)
      else
        new_landlord = Landlord.create!(name: owner_name,
                                        mailing_address: owner_mailing_address,
                                        city_state_zip: city_state_zip,
                                        property_id: self.id)

        update!(landlord_id: new_landlord.id)
      end
    end
  end

  def ensure_municipal_code
    if municipal_code.nil?
      if display_name.include?("Jersey City")
        update(municipal_code: "0906")
      elsif display_name.include?("Hackensack")
        update(municipal_code: "0223")
      end
    end
  end

  def normalize_street_address
    new_address = street_address.split
      .map { |el| STREET_ADDRESS_HASH[el] || el }
      .join(" ")

    update!(street_address: new_address)
  end
end
