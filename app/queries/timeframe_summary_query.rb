# frozen_string_literal: true

# app/queries/timeframe_summary_query.rb
class TimeframeSummaryQuery
  VALID_TIMEFRAMES = %w[day week month year].freeze

  def initialize(date:, time_frame:)
    @date = date
    @time_frame = validate_timeframe(time_frame)
  end

  def call
    timeframe_data = TimeframeService.calculate(@time_frame, @date)
    date_trunc_expr = date_trunc_sql

    Transaction
      .select(
        Arel.sql("#{date_trunc_expr} AS period_start"),
        Arel.sql('SUM(amount_debit) AS total_debit')
      )
      .where(date: timeframe_data[:start_date]..timeframe_data[:end_date])
      .group(Arel.sql(date_trunc_expr))
      .order(Arel.sql(date_trunc_expr))
      .to_a
  end

  private

  def validate_timeframe(timeframe)
    cleaned = timeframe.to_s.downcase.singularize

    unless VALID_TIMEFRAMES.include?(cleaned)
      raise ArgumentError, "Invalid timeframe: #{timeframe}"
    end

    cleaned
  end

  def date_trunc_sql
    # Safe because @time_frame is validated against VALID_TIMEFRAMES whitelist
    "date_trunc('#{@time_frame}', date)"
  end
end