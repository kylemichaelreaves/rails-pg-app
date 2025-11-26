FactoryBot.define do
  factory :budget_category do
    sequence(:name) { |n| "Category #{n}" }

    trait :groceries do
      name { 'Groceries' }
    end

    trait :utilities do
      name { 'Utilities' }
    end

    trait :transportation do
      name { 'Transportation' }
    end
  end
end

