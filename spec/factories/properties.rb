FactoryBot.define do
  factory :property do
    municipal_code { "0223" }
    street_address { "435 Main St" }
    owner_name { "Cynthia Drangus" }
    owner_mailing_address { "435 Main St" }
    city_state_zip { "Hackensack, NJ, 07601" }

    transient do
      landlords
      addresses
    end

    after(:create) do |property, evaluator|
      property.landlords << evaluator.landlords
      property.addresses << evaluator.addresses
      property.reload
    end
  end

  # factory :property_with_landlord do
  #   transient do
  #     landlord
  #   end

  #   after(:create) do |property, evaluator|
  #     property.landlords << evaluator.landlord
  #     property.reload
  #   end
  # end

  # transient do
  #   landlord
  #   address
  # end

  # after(:create) do |property, evaluator|
  #   property.landlords << evaluator.landlord
  #   property.addresses << evaluator.address
  #   property.reload
  # end
end
