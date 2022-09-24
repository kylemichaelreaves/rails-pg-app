FactoryBot.define do
  factory :landlord do
    
    name { "Berverly Drangus" }
    mailing_address { "210 Main St" }
    full_mailing_address { "210 Main St, Hackensack, NJ, 07601" }
    city_state_zip { "Hackensack, NJ, 07601" }

  end
end
