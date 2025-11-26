FactoryBot.define do
  factory :transaction do
    sequence(:transaction_number) { |n| "TXN-#{n}" }
    date { 2.days.ago }
    description { "Store purchase" }
    amount_debit { -50.00 }
    amount_credit { 0 }
    fees { 0 }
    balance { 1000.00 }
    check_number { nil }
    association :memo
    budget_category { nil }

    trait :with_budget_category do
      association :budget_category
    end

    trait :debit do
      amount_debit { -100.00 }
      amount_credit { 0 }
    end

    trait :credit do
      amount_debit { 0 }
      amount_credit { 100.00 }
    end

    trait :student_loan do
      association :memo, factory: [:memo, :aidvantage]
    end

    trait :car_loan do
      association :memo, factory: [:memo, :chase]
    end
  end
end
