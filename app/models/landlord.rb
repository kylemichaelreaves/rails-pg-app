class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :properties, foreign_key: "property_id", null: false, join_table: "properties_landlords"
  has_many :addresses, through: :properties

  after_find :ensure_property_ids

  scope :search_by_name, ->(name) {
    name = name.upcase
    where("name LIKE ?", "%#{name}%")
  }

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

  def ensure_property_ids
    properties_ids = Property.where(owner_name: name).pluck(:id)
    if properties_ids.length > 1
      properties_ids.each do |id|
        self.properties_ids << id
      end
    elsif properties_ids.length == 1
      self.properties_id << properties_ids[0]
    end
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
