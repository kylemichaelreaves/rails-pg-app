FactoryBot.define do
  factory :property do
    street_address { "208 Anderson St" }
    owner_name { "Cynthia Drangus" }
    owner_mailing_address { "208 Anderson St" }
    city_state_zip { "Hackensack, NJ, 07601" }
  end
end
