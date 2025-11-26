# frozen_string_literal: true

# app/queries/daily_totals_query.rb

# Is this class really needed if we have a FrequencySummaryQuery?

# DailyTotalsQuery for a given interval
class DailyTotalsQuery
  def initialize(interval:, date: nil)
    @interval = parse_interval(interval)
    @date = date.present? ? Date.parse(date.to_s) : nil
  end

  def call
    end_date = @date || Transaction.maximum(:date) || Date.current
    start_date = end_date - @interval

    Transaction
      .select(
        'DATE(date) AS date',
        'SUM(amount_debit) AS total_amount_debit'
      )
      .where(date: start_date..end_date)
      .group('DATE(date)')
      .order('DATE(date)')
  end

  private

  # Why is this method needed if we are only generating a daily totals query?
  # Also, shouldn't this method be included in timeframe_date_parser.rb or timeframe_service.rb?
  def parse_interval(interval)
    cleaned = interval.to_s.strip.downcase

    case cleaned
    when /^(\d+)\s*days?$/
      ::Regexp.last_match(1).to_i.days
    when /^(\d+)\s*weeks?$/
      ::Regexp.last_match(1).to_i.weeks
    when /^(\d+)\s*months?$/
      ::Regexp.last_match(1).to_i.months
    when /^(\d+)\s*years?$/
      ::Regexp.last_match(1).to_i.years
    else
      raise ArgumentError, "Invalid interval format: #{interval}. Use format like '30 days', '1 week', '3 months'"
    end
  end
end
