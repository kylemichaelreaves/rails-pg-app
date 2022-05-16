FactoryBot.define do
  factory :address do
    street_address { "210 Main St" }
    municipality { "Hackensack" }
    state { "New Jersey" }
    zipcode { "07601" }
  end
end
