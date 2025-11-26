# Model Tests Summary

## Overview

Created comprehensive unit tests for all application models using RSpec, FactoryBot, and Shoulda Matchers.

## Test Statistics

- **Total Examples**: 70
- **Passing**: 63
- **Pending**: 7 (require materialized view in test database)
- **Failures**: 0

## Models Tested

### 1. User Model (`spec/models/user_spec.rb`)

- **Validations**:
    - Email presence and uniqueness (case-insensitive)
    - Email format validation
    - Password presence (via `has_secure_password`)
- **Email Normalization**:
    - Strips whitespace
    - Converts to lowercase
    - Normalizes before uniqueness check
- **Role Enum**:
    - Default role: regular
    - Admin and regular roles
    - Helper methods: `#admin?` and `#regular?`
- **Password Authentication**:
    - Authenticates with correct password
    - Rejects incorrect password

### 2. Memo Model (`spec/models/memo_spec.rb`)

- **Associations**:
    - `has_many :transactions`
- **Validations**:
    - Name presence and uniqueness
- **Instance Methods**:
    - `#total_amount_debit` - sums all transaction debits
    - `#total_amount_credit` - sums all transaction credits
    - `#total_transactions` - counts associated transactions
- **Budget Category**:
    - Stored as text field (not a foreign key)
    - Can be nil

### 3. BudgetCategory Model (`spec/models/budget_category_spec.rb`)

- **Associations**:
    - `has_many :transactions`
- **Validations**:
    - Name presence and uniqueness
- **Behavior**:
    - Transactions can be grouped by budget category
    - Can calculate total spending through transactions
    - Memos use budget_category as text field (not association)

### 4. Transaction Model (`spec/models/transaction_spec.rb`)

- **Associations**:
    - `belongs_to :memo` (required)
    - `belongs_to :budget_category` (optional)
- **Validations**:
    - Transaction number presence
- **Instance Methods**:
    - `#student_loan?` - checks if memo is "Aidvantage"
    - `#car_loan?` - checks if memo is "JP Morgan Chase"
- **Class Methods**:
    - `.memos_summary_for_timeframe` - groups transactions by memo for a timeframe (requires materialized view)
- **Concerns**:
    - Includes `DateAggregatable` concern

### 5. BudgetCategoryFlat Model (`spec/models/budget_category_flat_spec.rb`)

- **Configuration**:
    - Uses `category_id` as primary key
    - Readonly model (materialized view)
- **Class Methods**:
    - `.refresh!` - refreshes materialized view
    - `.refresh!(concurrently: false)` - refreshes without concurrency
- **Scopes**:
    - `.root_categories` - filters by level 1
    - `.by_level(level)` - filters by specified level

### 6. Address Model (`spec/models/address_spec.rb`)

- **Validations**:
    - Street address, municipality, state, and zipcode presence

### 7. Property Model (`spec/models/property_spec.rb`)

- **Validations**:
    - Municipal code, street address, owner name, city/state/zip, and owner mailing address presence
- **Instance Methods**:
    - `#get_municipality` - returns municipality from municipal code

### 8. Landlord Model (`spec/models/landlord_spec.rb`)

- Basic validation tests (commented out in original file)

## Factory Improvements

### Updated Factories

1. **Memos Factory** (`spec/factories/memos.rb`):
    - Sequential unique names
    - Traits: `:with_budget_category`, `:aidvantage`, `:chase`

2. **Transactions Factory** (`spec/factories/transactions.rb`):
    - Sequential transaction numbers
    - Realistic amounts and dates
    - Traits: `:with_budget_category`, `:debit`, `:credit`, `:student_loan`, `:car_loan`

3. **Users Factory** (`spec/factories/users.rb`):
    - Sequential unique emails
    - Password set to "password123"
    - Traits: `:admin`, `:regular`

4. **Budget Categories Factory** (`spec/factories/budget_categories.rb`):
    - Sequential unique names
    - Traits: `:groceries`, `:utilities`, `:transportation`

## Model Corrections Made

1. **Memo Model**: Removed incorrect `belongs_to :budget_category` association (budget_category is a text field, not a
   foreign key)

2. **BudgetCategory Model**: Removed incorrect `has_many :memos` association (memos store budget_category as text)

3. **Rails Helper**: Fixed deprecated `config.fixture_path` configuration

## Pending Tests

The following tests are marked as pending because they require the `budget_categories_flat` materialized view to exist
in the test database:

1. `BudgetCategoryFlat#readonly?`
2. `BudgetCategoryFlat.root_categories` scope
3. `BudgetCategoryFlat.by_level` scope
4. `Transaction.memos_summary_for_timeframe` (all 4 tests)

### To Enable Pending Tests

Create the materialized view in the test database or add a test setup that creates it before running these tests.

## Running the Tests

```bash
# Run all model tests
bundle exec rspec spec/models/

# Run specific model test
bundle exec rspec spec/models/user_spec.rb

# Run with documentation format
bundle exec rspec spec/models/ --format documentation

# Run with progress format
bundle exec rspec spec/models/ --format progress
```

## Testing Best Practices Used

1. **Shoulda Matchers**: Used for concise validation and association testing
2. **FactoryBot**: Used for creating test data with realistic attributes
3. **Contexts and Descriptions**: Organized tests with clear describe/context blocks
4. **Let and Before Blocks**: Used for setting up test data
5. **Traits**: Created reusable factory variations
6. **Skip Conditions**: Gracefully skip tests that require infrastructure not present in test environment

## Next Steps

1. Create the `budget_categories_flat` materialized view in test database to enable pending tests
2. Add integration tests for complex model interactions
3. Add tests for model callbacks and lifecycle hooks
4. Consider adding tests for the `DateAggregatable` concern methods
5. Add tests for geocoding-related functionality in Address and Property models

