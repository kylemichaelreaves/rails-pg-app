# app/services/timeframe_service.rb
class TimeframeService
  VALID_TIMEFRAMES = %w[day week month year].freeze

  def self.calculate(timeframe, date_string = nil)
    new(timeframe, date_string).calculate
  end

  def initialize(timeframe, date_string = nil)
    @timeframe = timeframe.to_s.downcase
    validate_timeframe! # Validate BEFORE parsing date
    @date = parse_date(date_string)
  end

  def calculate
    case @timeframe
    when 'day'
      day_range
    when 'week'
      week_range
    when 'month'
      month_range
    when 'year'
      year_range
    end
  end

  private

  def parse_date(date_string)
    return Date.current unless date_string

    # Use your existing TimeframeDateParser for proper format handling
    TimeframeDateParser.parse(@timeframe, date_string.to_s)
  rescue TimeframeDateParser::InvalidDateError => e
    raise ArgumentError, e.message
  end

  def validate_timeframe!
    unless VALID_TIMEFRAMES.include?(@timeframe)
      raise ArgumentError, "Invalid timeframe: #{@timeframe}"
    end
  end

  def day_range
    {
      start_date: @date.beginning_of_day,
      end_date: @date.end_of_day,
      timeframe_expression: 'date',
      timeframe_number_expression: 'EXTRACT(DOY FROM date)'
    }
  end

  def week_range
    {
      start_date: @date.beginning_of_week,
      end_date: @date.end_of_week,
      timeframe_expression: 'date',
      timeframe_number_expression: 'EXTRACT(WEEK FROM date)'
    }
  end

  def month_range
    {
      start_date: @date.beginning_of_month,
      end_date: @date.end_of_month,
      timeframe_expression: 'date',
      timeframe_number_expression: 'EXTRACT(MONTH FROM date)'
    }
  end

  def year_range
    {
      start_date: @date.beginning_of_year,
      end_date: @date.end_of_year,
      timeframe_expression: 'date',
      timeframe_number_expression: 'EXTRACT(YEAR FROM date)'
    }
  end
end