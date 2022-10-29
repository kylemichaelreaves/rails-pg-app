class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :mailing_address, :city_state_zip, presence: true

  has_and_belongs_to_many :properties
  has_and_belongs_to_many :addresses

  scope :search_by_name, lambda { |name|
    name = name.upcase
    where('name LIKE ?', "%#{name}%")
  }

  def find_properties
    Property.where(owner_name: name)
  end

  def owns_multiple_properties?
    find_properties.count > 1
  end

  def full_mailing_address
    [mailing_address, city_state_zip].compact.join(', ')
  end

  # should and LLC count as a single owner?
  def single_owner?
    !name.include? '&' or name.chars.count(',') <= 1 and !name.llc?
  end

  def multiple_owners?
    !single_owner?
  end

  def llc?
    name.include? 'LLC'
  end

  def find_property_ids
    find_properties.pluck(:id)
  end

  def ensure_properties
    return unless properties.empty?

    found_properties = find_properties
    return unless found_properties.present?

    found_properties.each do |property|
      properties << property unless properties.include? property
    end
  end
end
