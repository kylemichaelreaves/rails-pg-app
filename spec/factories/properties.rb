FactoryBot.define do
  factory :property do
    street_address { "208 Main St" }
    owner_name { "Cynthia Drangus" }
    owner_mailing_address { "210 Main St" }
    city_state_zip { "Hackensack, NJ, 07601" }

    # before(:create) do |property|
    #   # check if property is associated with an address
    #   if property.address.nil?
    #     csz = property.city_state_zip.split(",")
    #     property.address = build(:address,
    #                              street_address: property.street_address,
    #                              municipality: csz[0],
    #                              state: csz[1],
    #                              zipcode: csz[2])
    #   end

    #   if property.landlord.nil?
    #     property.landlord = build(:landlord,
    #                               name: property.owner_name,
    #                               mailing_address: property.owner_mailing_address,
    #                               city_state_zip: property.city_state_zip)
    #   end
    # end
  end
end
