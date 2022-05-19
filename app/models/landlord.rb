class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :properties, foreign_key: "properties_id", null: false, join_table: "properties_landlords"
  has_many :addresses, through: :properties

  scope :search_by_name, ->(name) {
      name.upcase
      where("name LIKE ?", "%#{name}%")
    }

  # return landlords who live outside of the US
  scope :lives_outside_of_the_US, -> {
      Geocoder.search(full_mailing_address).first.country != "United States"
    }

  scope :owns_multiple_properties, -> {
      Property.where(owner_name: name).count > 1
    }

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
end
