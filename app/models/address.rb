class Address < ApplicationRecord
  validates :street_address, :municipality, :state, :zipcode, presence: true
  validates :full_address, :latitude_and_longitude, uniqueness: true

  has_and_belongs_to_many :properties, foreign_key: "property_id", join_table: "addresses_properties"
  has_and_belongs_to_many :landlords, foreign_key: "landlord_id", join_table: "landlords_properties"

  before_create :ensure_full_address,
                :ensure_latitude,
                :ensure_longitude,
                :ensure_latitude_and_longitude
  #  :ensure_properties_id

  # after_find :ensure_properties_id #, :ensure_landlords_id

  geocoded_by :full_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  def concat_full_address
    [street_address, municipality, state, zipcode].compact.join(", ")
  end

  private

  def ensure_full_address
    self.full_address = concat_full_address if full_address.nil?
  end

  def ensure_latitude
    if latitude.nil?
      result = Geocoder.search(full_address)
      if result
        if result.first
          if result.first.latitude
            self.latitude = result.first.latitude
          end
        end
      end
    end
  end

  def ensure_longitude
    if longitude.nil?
      result = Geocoder.search(full_address)
      if result
        if result.first
          if result.first.longitude
            self.longitude = result.first.longitude
          end
        end
      end
    end
  end

  def ensure_latitude_and_longitude
    self.latitude_and_longitude = [latitude, longitude].compact.join(", ") if latitude_and_longitude.nil?
  end

  def ensure_properties_id
    if property_id.nil?
      # is there an property whose property_full_address matches an address's full_address?
      # property = Property.where(property_full_address: full_address)
      # if property.exists?
      #   update(properties_id: property.pluck(:id))
      # create new Property record
      property = Property.find_or_create_by!(street_address: street_address)

      # update self to include the properties_id
      # self.properties_id = property.id
      update(properties_id: property.pluck(:id)) if property.exists?
    end
  end

  def ensure_landlords_id
    if landlord_id.nil?
      id = landlords.first.id
      update(landlords_id: id)
    end
  end
end
