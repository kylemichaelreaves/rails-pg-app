class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_and_belongs_to_many :properties
  has_many :addresses, through: :properties

  def self.search(search)
    search = search.upcase
    if search
        Landlord.where("name LIKE ?", "%#{search}%")
    else
        all
    end
  end

  def lives_outside_us?
    Geocoder.search(full_mailing_address)[0].data["address"]["country"] != "United States"
  end

  def full_mailing_address
    [mailing_address, city_state_zip].compact.join(", ")
  end

  def single_person?
    name.not.include? "&" or name.chars.count(",") <= 1 and name.not.include? "LLC"
  end

  def multiple_owners?
    name.include? "&" or name.chars.count(",") >= 1 and name.not.include? "LLC"
  end

  def llc?
    name.include? "LLC"
  end

  #  is the mailing address the same as the Property.street_address?
  def mailing_address_is_same_as_property_address?
    if self.addresses.count > 0
      self.addresses.first.street_address == self.properties.first.street_address
    else
      false
    end
  end

  def owns_multiple_properties?
    number_of_properties_owned > 1
  end

  def number_of_properties_owned
    Property.where(owner_name: name).count
  end
end
