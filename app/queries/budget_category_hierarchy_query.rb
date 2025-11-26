# frozen_string_literal: true

# app/queries/budget_category_hierarchy_query.rb
class BudgetCategoryHierarchyQuery
  def initialize(date:, time_frame:)
    @date = date
    @time_frame = time_frame
    validate_params!
  end

  def call
    timeframe_data = TimeframeService.calculate(@time_frame, @date)

    sql = <<~SQL
      WITH RECURSIVE
        used_categories AS (
          SELECT m.budget_category, t.amount_debit
          FROM memos m
          JOIN transactions t ON m.id = t.memo_id
          WHERE t.date BETWEEN $1 AND $2#{' '}
            AND m.budget_category IS NOT NULL
        ),
        category_rollup AS (
          SELECT bcf.category_id,
                 bcf.category_name,
                 bcf.full_path,
                 bcf.level,
                 bcf.parent_id,
                 bcf.source_id,
                 uc.amount_debit
          FROM budget_categories_flat bcf
          JOIN used_categories uc ON uc.budget_category = bcf.full_path
      #{'    '}
          UNION ALL
      #{'    '}
          SELECT parent.category_id,
                 parent.category_name,
                 parent.full_path,
                 parent.level,
                 parent.parent_id,
                 parent.source_id,
                 cr.amount_debit
          FROM category_rollup cr
          JOIN budget_categories_flat parent ON parent.category_id = cr.parent_id
        )
      SELECT cr.category_id,
             cr.category_name,
             cr.full_path,
             cr.level,
             cr.parent_id,
             cr.source_id,
             SUM(cr.amount_debit) as total_amount_debit
      FROM category_rollup cr
      GROUP BY cr.category_id, cr.category_name, cr.full_path, cr.level, cr.parent_id, cr.source_id
      ORDER BY cr.level, cr.full_path
    SQL

    ActiveRecord::Base.connection.exec_query(
      sql,
      'Budget Category Hierarchy',
      [
        timeframe_data[:start_date].to_s,
        timeframe_data[:end_date].to_s
      ]
    )
  end

  private

  def validate_params!
    raise ArgumentError, 'budgetCategoryHierarchy requires date and timeFrame parameters' unless @date && @time_frame
  end
end