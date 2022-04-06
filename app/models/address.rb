class Address < ApplicationRecord
  validates :street_address, :municipality, :state, :zipcode, presence: true

  geocoded_by :full_address

  def full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end
end
