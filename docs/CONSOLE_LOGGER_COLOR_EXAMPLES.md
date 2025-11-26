# ConsoleLogger Color Usage Examples

## Basic Text Coloring

```ruby
# Single color
ConsoleLogger.colorize("This is red text", :red)
ConsoleLogger.colorize("This is green text", :green)
ConsoleLogger.colorize("This is blue text", :blue)

# With styles
ConsoleLogger.colorize("Bold red", :red, :bold)
ConsoleLogger.colorize("Underlined blue", :blue, :underline)
ConsoleLogger.colorize("Bold + underlined green", :green, :bold, :underline)
```

## Semantic Methods (Auto-colored)

```ruby
# These automatically use appropriate colors
ConsoleLogger.success("Database connection established") # Green with ✅
ConsoleLogger.warning("Cache miss detected") # Yellow with ⚠️
ConsoleLogger.error("Failed to load configuration") # Red with ❌
ConsoleLogger.info("Processing 100 records...") # No color
```

## Info with Custom Colors

```ruby
ConsoleLogger.info("Starting migration...", color: :cyan)
ConsoleLogger.info("Rolling back changes...", color: :magenta)
ConsoleLogger.info("Database query:", color: :light_blue)
```

## Colored Sections

```ruby
# Default cyan section
ConsoleLogger.section("Importing Data") do
  ConsoleLogger.info("Reading CSV file...")
  ConsoleLogger.success("Imported 1,234 records")
end

# Custom colored sections
ConsoleLogger.section("Warning Zone", color: :yellow) do
  ConsoleLogger.warning("This operation is experimental")
end

ConsoleLogger.section("Critical Operation", color: :red) do
  ConsoleLogger.error("Manual intervention required")
end

ConsoleLogger.section("Success Report", color: :green) do
  ConsoleLogger.success("All tests passed!")
end
```

## Colored Summaries

```ruby
# Blue summary (default)
ConsoleLogger.print_summary("Database Stats", {
  "Total Transactions" => 10_000,
  "Active Users" => 543,
  "Processing Time" => "2.3s"
}, color: :blue)

# Green summary for success metrics
ConsoleLogger.print_summary("Import Results", {
  "Records Imported" => 1_234,
  "Errors" => 0,
  "Duration" => "5.2s"
}, color: :green)

# Yellow summary for warnings
ConsoleLogger.print_summary("System Warnings", {
  "Low Memory" => "15% remaining",
  "High CPU" => "85% usage",
  "Old Records" => 45
}, color: :yellow)
```

## Controlling Color Output

```ruby
# Check if colors are supported (automatic TTY detection)
if ConsoleLogger.color_supported?
  puts "Terminal supports colors!"
end

# Disable colors (useful for log files or CI/CD)
ConsoleLogger.disable_colors!
ConsoleLogger.success("This won't be colored")

# Re-enable colors
ConsoleLogger.enable_colors!
ConsoleLogger.success("This will be colored again")
```

## Available Colors Reference

### Basic Colors

- `:black` - Black text
- `:red` - Red text (used for errors)
- `:green` - Green text (used for success)
- `:yellow` - Yellow text (used for warnings)
- `:blue` - Blue text
- `:magenta` - Magenta text
- `:cyan` - Cyan text (default for sections)
- `:white` - White text

### Light Color Variants

- `:light_black` (gray)
- `:light_red`
- `:light_green`
- `:light_yellow`
- `:light_blue`
- `:light_magenta`
- `:light_cyan`
- `:light_white`

### Text Styles

- `:bold` - Bold text
- `:dim` - Dimmed text
- `:italic` - Italic text
- `:underline` - Underlined text

### Combining Styles

```ruby
# Multiple styles can be combined
ConsoleLogger.colorize("Important!", :red, :bold, :underline)
ConsoleLogger.colorize("Note:", :yellow, :bold)
ConsoleLogger.colorize("Link", :blue, :underline)
```

## Practical Examples

### Database Seeding

```ruby
ConsoleLogger.section("Database Seeding", color: :cyan) do
  ConsoleLogger.info("Clearing existing data...", color: :yellow)
  BudgetCategory.delete_all

  ConsoleLogger.info("Importing categories...")
  categories = import_categories

  ConsoleLogger.success("Imported #{categories.count} categories")

  ConsoleLogger.print_summary("Seeding Complete", {
    "Categories" => categories.count,
    "Time Taken" => "3.2s"
  }, color: :green)
end
```

### Error Handling

```ruby

begin
  process_transaction
  ConsoleLogger.success("Transaction processed successfully")
rescue StandardError => e
  ConsoleLogger.error("Transaction failed: #{e.message}")
  ConsoleLogger.info("Stack trace:", color: :light_black)
  ConsoleLogger.info(e.backtrace.first(3).join("\n"), color: :light_black)
end
```

### Progress Reporting

```ruby
ConsoleLogger.section("Batch Processing", color: :blue) do
  items.each_with_index do |item, index|
    if item.valid?
      ConsoleLogger.success("✓ Item #{index + 1}: #{item.name}")
    else
      ConsoleLogger.error("✗ Item #{index + 1}: #{item.errors.full_messages.join(', ')}")
    end
  end
end
```

## Tips

1. **Use semantic methods** (`success`, `warning`, `error`) for automatic coloring
2. **Choose appropriate colors** for your context (green for success, red for errors, etc.)
3. **Test without colors** by calling `disable_colors!` to ensure readability
4. **Colors work best in terminals** - they're automatically disabled for non-TTY output
5. **Combine styles sparingly** - too many styles can reduce readability

