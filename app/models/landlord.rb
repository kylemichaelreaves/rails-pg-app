class Landlord < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_and_belongs_to_many :properties

  def lives_outside_us?
  end

  def single_person?
  end

  def multiple_owners?
    name.include? "&" and name.not.include? "LLC"
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
