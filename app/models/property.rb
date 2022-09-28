class Property < ApplicationRecord
  include PropertiesHelper
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :municipal_code, :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :landlords, foreign_key: "landlord_id", null: false, join_table: "landlords_properties", dependent: :destroy
  has_and_belongs_to_many :addresses, foreign_key: "address_id", null: false, join_table: "addresses_properties", dependent: :destroy

  after_initialize :ensure_property_full_address,
                   :ensure_owner_mailing_address

  # before_validation :normalize_street_address

  # after_validation :geocode, if: Proc.new { |obj| obj.property_full_address.changed? }

  before_save :ensure_latitude,
              :ensure_longitude

  after_find :ensure_landlord_id,
             :ensure_address_id

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
    Address.where(latitude_and_longitude: latitude.to_s + ", " + longitude.to_s)
  end

  def get_zipcode
    # TODO refactor this method so it is doing this call somewhere else
    result = Geocoder.search("#{street_address}" + ", " + "#{get_municipality}" + ", " + "New Jersey").first
    result.postal_code if result.present?
  end

  def not_in_jersey_city?
    !display_name.include?("Jersey City")
  end

  private

  def ensure_owner_mailing_address
    if owner_full_mailing_address.nil?
      self.owner_full_mailing_address = [owner_mailing_address, city_state_zip].compact.join(", ")
    end
  end

  def ensure_latitude
    # TODO refactor this method into a single method whose result is an array of latitude and longitude
    # TODO this method's Geocoder should specify as a parameter, the country and county of the address to avoid noisy results
    if latitude.nil?
      result = Geocoder.search(property_full_address)
      if result.length > 1
        res = result.select { |property| get_municipality.in?(property.data["display_name"]) and property.data["type"] == "residential" }.first
        self.latitude = res.latitude if res.present?
      elsif result.length == 1
        result = result.first
        self.latitude = result.latitude if result.present?
      end
    end
  end

  def ensure_longitude
    if longitude.nil?
      result = Geocoder.search(property_full_address)
      if result.length > 1
        # filter the results for only those that contain the municipality
        res = result.select { |property| get_municipality.in?(property.data["display_name"]) and property.data["type"] == "residential" }.first
        self.longitude = res.longitude if res.present?
      elsif result.length == 1
        res = result.first
        self.longitude = res.longitude if res.present?
      end
    end
  end

  def ensure_display_name
    if display_name.nil?
      result = Geocoder.search(property_full_address)
      # if there is more than one result, filter the results for only those that contain the municipality
      if result.length > 1
        res = result.select { |property| get_municipality.in?(property.data["display_name"]) and property.data["type"] == "residential" }.first
        self.display_name = res.data["display_name"] if res.present?
      elsif result.length == 1
        res = result.first
        self.display_name = res.data["display_name"] if res.present?
      end
    end
  end

  def ensure_property_full_address
    if property_full_address.nil? or self.street_address_changed?
      self.property_full_address = [street_address, get_municipality, "New Jersey"].compact.join(", ")
    end
  end

  def ensure_address_id
    if address_id.nil?
      address = Address.find_by(latitude_and_longitude: latitude.to_s + ", " + longitude.to_s)
      if address.present?
        update!(address_id: address.id)
      else
        new_address = Address.create!(
          street_address: street_address,
          municipality: get_municipality,
          state: "New Jersey",
          zipcode: get_zipcode,
          # zipcode: g_code_split[-2].scan(/\d/).join("").strip,
          property_id: self.id,
        )
        update!(address_id: new_address.id)
      end
    end
  end

  def ensure_landlord_id
    if landlord_id.nil?
      landlord = Landlord.find_by(name: owner_name)
      if landlord.present?
        update!(landlord_id: landlord.id)
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
