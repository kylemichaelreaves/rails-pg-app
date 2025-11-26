FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password123' }
    role { :regular }

    trait :admin do
      role { :admin }
    end

    trait :regular do
      role { :regular }
    end
  end
end
