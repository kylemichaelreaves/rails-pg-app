class Property < ApplicationRecord
  include PropertiesHelper
  # city_state_zip DOES NOT CORRESPOND to street_address but to owner_mailing_address
  validates :municipal_code, :street_address, :owner_name, :owner_mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :landlords
  has_and_belongs_to_many :addresses

  after_initialize :ensure_property_full_address,
                   :ensure_owner_mailing_address

  # before_validation :normalize_street_address

  # after_validation :geocode, if: Proc.new { |obj| obj.property_full_address.changed? }

  before_save :ensure_latitude,
              :ensure_longitude

  # after_find :ensure_municipal_code
  # :ensure_landlords,
  # :ensure_addresses

  geocoded_by :property_full_address
  reverse_geocoded_by :latitude, :longitude

  scope :search_by_street_address, lambda { |street_address|
    street_address = street_address.upcase
    where('street_address LIKE ?', "%#{street_address}%")
  }

  scope :search_by_name, lambda { |name|
    name = name.upcase
    where('owner_name LIKE ?', "%#{name}%")
  }

  def get_municipality
    # if MUNICIPAL_HASH[municipal_code].nil?
    #   city_state_zip
    #     .gsub(/\d/, '')
    #     .gsub(/(NJ|New Jersey|NEW JERSEY)/, '')
    #     .gsub(/[^a-z0-9\s]/i, '')
    #     .strip
    # end
    MUNICIPAL_HASH[municipal_code]
  end

  def find_landlords
    Landlord.where(name: owner_name)
  end

  def find_addresses
    Address.where(latitude: latitude, longitude: longitude)
  end

  def find_zipcode
    result = Geocoder.search("#{street_address}, #{get_municipality}, New Jersey").first
    result.postal_code if result.present?
  end

  def geocoder_search(address, state = 'New Jersey', country_code = 'us')
    # TODO: needs to return a geojson object
    Geocoder.search(address, params: { state:, country_code: })
  end

  def not_in_jersey_city?
    !display_name.include?('Jersey City')
  end

  private

  def ensure_owner_mailing_address
    return unless owner_mailing_address.nil?

    self.owner_full_mailing_address = [owner_mailing_address, city_state_zip].compact.join(', ')
  end

  def ensure_display_name
    result = geocoder_search(property_full_address) if display_name.nil?
    if result.length > 1
      display_proc = proc { |p| get_municipality.in?(p.data['display_name']) and p.data['type'] == 'residential' }
      res = result.map(&display_proc).first
    elsif result.length == 1
      res = result.first
    end
    self.display_name = res.data['display_name'] if res.present?
  end

  def ensure_property_full_address
    new_add = [street_address, get_municipality, 'New Jersey'].compact.join(', ')
    self.property_full_address = new_add if property_full_address.nil? || street_address_changed?
  end

  def ensure_addresses
    return unless addresses.empty?

    result_addresses = find_addresses
    if result_addresses.present?
      result_addresses.each do |address|
        addresses << address unless addresses.include?(address)
      end
    else
      new_address = Address.create!(street_address:, municipality: get_municipality, state: 'New Jersey', zipcode: find_zipcode)
      addresses << new_address
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
      new_landlord = Landlord.create!(name: owner_name, mailing_address: owner_mailing_address, city_state_zip:)
      landlords << new_landlord
    end
  end

  def ensure_municipal_code
    return unless municipal_code.nil?

    if display_name.include?('Jersey City')
      update(municipal_code: '0906')
    elsif display_name.include?('Hackensack')
      update(municipal_code: '0223')
    end
  end

  def normalize_street_address
    new_address = street_address.split
                                .map { |el| STREET_ADDRESS_HASH[el] || el }
                                .join(' ')

    update!(street_address: new_address)
  end
end

