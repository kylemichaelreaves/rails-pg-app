# Ruby-Style Query Comparison

## Raw SQL vs Rails ActiveRecord

### ❌ Raw SQL Approach (Less Ruby-like)

```ruby
sql = <<-SQL
  UPDATE transactions 
  SET memo = memos.name 
  FROM memos 
  WHERE transactions.memo_id = memos.id 
    AND (transactions.memo IS NULL OR transactions.memo = '')
SQL

ActiveRecord::Base.connection.execute(sql)
```

**Problems:**

- Database-specific syntax (PostgreSQL `FROM` clause)
- Loses type safety
- No validation or callbacks
- String interpolation risks
- Harder to test
- Less maintainable

---

### ✅ Rails ActiveRecord Approach (More Ruby-like)

```ruby
Transaction.where(memo: nil)
           .joins(:memo)
           .update_all('memo = memos.name')
```

**Benefits:**

- ✅ Uses Rails associations (`belongs_to :memo`)
- ✅ Database agnostic (works with MySQL, PostgreSQL, SQLite, etc.)
- ✅ Chainable query methods
- ✅ Readable and concise
- ✅ Type-safe column references
- ✅ Better for testing (can stub/mock ActiveRecord)
- ✅ Follows Rails conventions

---

## Even More Ruby-like Alternatives

### Option 1: Using `select` with SET clause

```ruby
Transaction.where(memo: nil)
           .joins(:memo)
           .update_all('transactions.memo = memos.name')
```

### Option 2: If you wanted to process each record (slower but more explicit)

```ruby
Transaction.includes(:memo).where(memo: nil).find_each do |transaction|
  transaction.update_column(:memo, transaction.memo.name)
end
```

**Note:** This is slower because it loads each record into memory, but it's more "Ruby-like" if you need to run
callbacks or validations.

### Option 3: Using pluck for bulk update (alternative approach)

```ruby
memo_map = Memo.pluck(:id, :name).to_h

Transaction.where(memo: nil).find_in_batches do |batch|
  updates = batch.map do |t|
    { id: t.id, memo: memo_map[t.memo_id] }
  end

  Transaction.upsert_all(updates, unique_by: :id)
end
```

---

## Why `.update_all` is the Best Choice Here

1. **Single SQL query** - Most efficient
2. **Bulk update** - Updates all matching records at once
3. **Uses Rails query interface** - Database agnostic
4. **Leverages associations** - Uses `.joins(:memo)` relationship
5. **No callbacks needed** - We're just syncing data, not triggering business logic
6. **Idiomatic Rails** - This is the Rails Way™ for bulk updates

---

## Ruby Style Enhancements in the Seeds File

### Used `.positive?` instead of `> 0`

```ruby
# Less Ruby-like
if null_memo_count > 0

  # More Ruby-like ✅
  if null_memo_count.positive?
```

### Used method chaining

```ruby
# Less Ruby-like
count = Transaction.where(memo: nil)
count = count.joins(:memo)
count.update_all('memo = memos.name')

# More Ruby-like ✅
Transaction.where(memo: nil)
           .joins(:memo)
           .update_all('memo = memos.name')
```

### Used guard clause pattern

```ruby
# Check and return early if nothing to do
if null_memo_count.positive?
  # do the work
else
  puts "✓ All transactions already have memo names populated"
end
```

---

## When to Use Each Approach

| Use Case                           | Method                   | Why                             |
|------------------------------------|--------------------------|---------------------------------|
| **Bulk sync/backfill**             | `.update_all`            | ✅ Fast, efficient, simple       |
| **Need callbacks**                 | `.find_each` + `.update` | Triggers validations/callbacks  |
| **Complex logic per record**       | `.find_each`             | Need Ruby logic for each record |
| **Database-specific optimization** | Raw SQL                  | Specific DB features needed     |
| **One-time data fix**              | Rails console            | Interactive, exploratory        |

For this backfill use case, `.update_all` is the perfect choice! 🎯

