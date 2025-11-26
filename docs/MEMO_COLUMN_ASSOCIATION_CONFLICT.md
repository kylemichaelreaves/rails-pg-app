# Memo Column vs Memo Association - Important Note

## The Problem

The `transactions` table has both:

1. **`memo_id`** - A foreign key to the `memos` table (the association)
2. **`memo`** - A text column that stores the memo name

This creates a naming conflict in Rails because the model has `belongs_to :memo`, which creates a `memo` method for the
association.

## The Error

When trying to set both in the initializer:

```ruby
Transaction.new(
  memo_id: memo.id,
  memo: memo.name # ❌ ERROR!
)
```

Rails throws:

```
ActiveRecord::AssociationTypeMismatch - Memo(#9536) expected, got "CAVA PARAMUS" which is an instance of String(#1464)
```

Rails thinks you're trying to assign a string to the `memo` association, not the `memo` text column.

## The Solution

Use `write_attribute` to explicitly set the text column AFTER creating the object:

```ruby
transaction = Transaction.new(
  transaction_number:,
  date:,
  description: row['Description'].to_s.strip,
  memo_id: memo.id, # ✅ Set the foreign key
# ... other fields
)

# ✅ Explicitly set the memo text column
transaction.write_attribute(:memo, memo.name)

transaction.save
```

## Alternative Solutions

### Option 1: Use bracket notation (also works)

```ruby
transaction[:memo] = memo.name
```

### Option 2: Use `update_column` after save (less efficient)

```ruby
transaction.save
transaction.update_column(:memo, memo.name)
```

### Option 3: Rename the column (best long-term solution)

Create a migration to rename `memo` to `memo_name`:

```ruby

class RenameMemoColumnToMemoName < ActiveRecord::Migration[8.0]
  def change
    rename_column :transactions, :memo, :memo_name
  end
end
```

Then you could use:

```ruby
Transaction.new(
  memo_id: memo.id,
  memo_name: memo.name # ✅ No conflict!
)
```

## Why We Chose `write_attribute`

- ✅ Clear intent - explicitly setting a column
- ✅ No database migration needed
- ✅ Works immediately
- ✅ Doesn't change existing code
- ✅ Avoids breaking changes

## Backfill Still Works

The backfill uses SQL which directly targets the column name, so it's unaffected:

```ruby
Transaction.where(memo: nil)
           .joins(:memo)
           .update_all('memo = memos.name') # ✅ SQL knows it's a column
```

## Summary

When you have a column with the same name as an association, Rails prioritizes the association. Use
`write_attribute(:column_name, value)` to explicitly set the column value.

