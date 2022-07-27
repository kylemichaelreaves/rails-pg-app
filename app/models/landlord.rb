class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :properties, foreign_key: "property_id", null: false, join_table: "landlords_properties"
  has_and_belongs_to_many :addresses, foreign_key: "address_id", null: false, join_table: "properties_addresses"

  after_find :ensure_property_ids

  scope :search_by_name, ->(name) {
    name = name.upcase
    where("name LIKE ?", "%#{name}%")
  }

  def properties
    Property.where(owner_name: name)
  end

  def owns_multiple_properties?
    Property.where(owner_name: name).count > 1
  end

  def full_mailing_address
    [mailing_address, city_state_zip].compact.join(", ")
  end

  # should and LLC count as a single owner?
  def single_owner?
    !name.include? "&" or name.chars.count(",") <= 1 and !name.llc?
  end

  def multiple_owners?
    !single_owner?
  end

  def llc?
    name.include? "LLC"
  end

  def get_property_ids
    Property.where(owner_name: name).pluck(:id)
  end

  def ensure_property_ids
    if property_ids.nil?
      update!(property_ids: get_property_ids)
    end
  end

  #  is the mailing address the same as the Property.street_address?
  def same_address?
    if self.addresses.count > 0
      self.addresses.first.street_address == self.properties.first.street_address
    else
      false
    end
  end
end
