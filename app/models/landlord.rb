class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_and_belongs_to_many :properties

  def lives_outside_us?
    # eventually it would be nice to check if full_mailing_address already exists

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

  def owns_multiple_properties?
    number_of_properties_owned > 1
  end

  def number_of_properties_owned
    Property.where(owner_name: name).count
  end
end
