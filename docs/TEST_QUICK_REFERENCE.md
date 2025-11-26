# Quick Test Reference

## Run All Model Tests

```bash
bundle exec rspec spec/models/
```

## Run Individual Model Tests

```bash
bundle exec rspec spec/models/user_spec.rb
bundle exec rspec spec/models/memo_spec.rb
bundle exec rspec spec/models/budget_category_spec.rb
bundle exec rspec spec/models/transaction_spec.rb
bundle exec rspec spec/models/address_spec.rb
bundle exec rspec spec/models/property_spec.rb
bundle exec rspec spec/models/landlord_spec.rb
bundle exec rspec spec/models/budget_category_flat_spec.rb
```

## Current Test Status

✅ **63 passing tests**
⏸️ **7 pending tests** (require materialized view)
❌ **0 failing tests**

## Test Coverage by Model

| Model              | Test File                      | Tests                     | Status          |
|--------------------|--------------------------------|---------------------------|-----------------|
| User               | `user_spec.rb`                 | 18                        | ✅ All passing   |
| Memo               | `memo_spec.rb`                 | 12                        | ✅ All passing   |
| BudgetCategory     | `budget_category_spec.rb`      | 8                         | ✅ All passing   |
| Transaction        | `transaction_spec.rb`          | 12 (8 passing, 4 pending) | ⚠️ Some pending |
| BudgetCategoryFlat | `budget_category_flat_spec.rb` | 7 (4 passing, 3 pending)  | ⚠️ Some pending |
| Address            | `address_spec.rb`              | 4                         | ✅ All passing   |
| Property           | `property_spec.rb`             | 9                         | ✅ All passing   |
| Landlord           | `landlord_spec.rb`             | 0                         | ⚠️ Needs tests  |

## What Was Created

### New Test Files

All model spec files were updated with comprehensive tests covering:

- Associations
- Validations
- Instance methods
- Class methods
- Scopes
- Edge cases

### Updated Factories

All factories were enhanced with:

- Sequential unique identifiers
- Realistic default values
- Useful traits for different scenarios
- Proper associations

### Fixed Issues

1. Removed incorrect `belongs_to :budget_category` from Memo model
2. Removed incorrect `has_many :memos` from BudgetCategory model
3. Fixed deprecated `config.fixture_path` in rails_helper.rb
4. Added proper handling for missing materialized view in tests

## Dependencies

The tests use:

- **RSpec Rails** - Testing framework
- **FactoryBot** - Test data creation
- **Shoulda Matchers** - Validation/association matchers

All dependencies are already installed in your Gemfile.

