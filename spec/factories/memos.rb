FactoryBot.define do
  factory :memo do
    sequence(:name) { |n| "Vendor #{n}" }
    budget_category { nil }

    trait :with_budget_category do
      budget_category { 'Food/Groceries' }
    end

    trait :aidvantage do
      name { 'Aidvantage' }
    end

    trait :chase do
      name { 'JP Morgan Chase' }
    end
  end
end

