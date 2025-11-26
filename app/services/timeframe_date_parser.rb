# frozen_string_literal: true

# app/services/timeframe_date_parser.rb
class TimeframeDateParser
  VALID_TIMEFRAMES = %w[day week month year].freeze

  class InvalidDateError < StandardError; end

  class UnsupportedTimeframeError < StandardError; end

  def self.parse(timeframe, date_string)
    new(timeframe, date_string).parse
  end

  def initialize(timeframe, date_string)
    @timeframe = timeframe
    @date_string = date_string
    validate_timeframe!
  end

  def parse
    send("parse_#{@timeframe}")
  end

  private

  def validate_timeframe!
    unless VALID_TIMEFRAMES.include?(@timeframe)
      raise UnsupportedTimeframeError, "Unsupported timeframe: #{@timeframe}"
    end
  end

  def parse_day
    Date.parse(@date_string)
  rescue ArgumentError => e
    raise InvalidDateError, "Invalid date format: #{@date_string}"
  end

  def parse_week
    week, year = @date_string.split('-').map(&:to_i)
    raise InvalidDateError, "Invalid week format: #{@date_string}" if week.nil? || year.nil?

    # Get the start of the week (Monday) for the given week number
    Date.commercial(year, week, 1)
  rescue ArgumentError => e
    raise InvalidDateError, "Invalid week input: #{@date_string}"
  end

  def parse_month
    month, year = @date_string.split('-').map(&:to_i)
    raise InvalidDateError, "Invalid month format: #{@date_string}" if month.nil? || year.nil?

    Date.new(year, month, 1)
  rescue ArgumentError => e
    raise InvalidDateError, "Invalid month input: #{@date_string}"
  end

  def parse_year
    year = @date_string.to_i
    raise InvalidDateError, "Invalid year format: #{@date_string}" if year.zero?

    Date.new(year, 1, 1)
  rescue ArgumentError => e
    raise InvalidDateError, "Invalid year input: #{@date_string}"
  end
end
