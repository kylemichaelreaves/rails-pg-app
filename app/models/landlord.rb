class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :properties, foreign_key: "property_id", null: false, join_table: "landlords_properties", dependent: :destroy
  has_and_belongs_to_many :addresses, foreign_key: "address_id", null: false, join_table: "addresses_properties", dependent: :destroy

  after_find :ensure_properties_id

  scope :search_by_name, ->(name) {
    name = name.upcase
    where("name LIKE ?", "%#{name}%")
  }

  def get_properties
    Property.where(owner_name: name)
  end

  def owns_multiple_properties?
    get_properties.count > 1
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
    get_properties.pluck(:id)
  end

  def ensure_properties_id
    if property_id.nil?
      update!(property_id: get_property_ids.first)
    end
  end

  def ensure_property_ids
    if property_ids.length == 0
      get_property_ids.each do |id|
        update!(property_ids: id)
      end
    end
  end
end
