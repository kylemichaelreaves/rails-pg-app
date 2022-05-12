FactoryBot.define do
  factory :address do
    street_address  { "208 Anderson St" }
    municipality  { "Hackensack" }
    state  { "New Jersey" }
    zipcode { "07601" }
  end
end
