# frozen_string_literal: true

# app/queries/frequency_summary_query.rb
class FrequencySummaryQuery
  VALID_FREQUENCIES = %w[daily weekly monthly yearly].freeze

  def initialize(frequency)
    @frequency = frequency.to_s.downcase
    validate_frequency!
  end

  def call
    config = frequency_config(@frequency)

    Transaction
      .select(
        "#{config[:expression]} AS period",
        'ROUND(SUM(amount_debit)::numeric, 2) AS total_debit',
        'ROUND(SUM(amount_credit)::numeric, 2) AS total_credit',
        'ROUND((SUM(amount_credit) + SUM(amount_debit))::numeric, 2) AS amount_difference'
      )
      .group(config[:expression])
      .order(Arel.sql("#{config[:order_expression]} DESC"))
  end

  private

  def validate_frequency!
    return if VALID_FREQUENCIES.include?(@frequency)

    raise ArgumentError, "Invalid frequency: #{@frequency}. Must be one of: #{VALID_FREQUENCIES.join(', ')}"
  end

  def frequency_config(frequency)
    case frequency
    when 'day'
      {
        expression: "TO_CHAR(date, 'MM/DD/YYYY')",
        order_expression: "TO_DATE(TO_CHAR(date, 'MM/DD/YYYY'), 'MM/DD/YYYY')"
      }
    when 'week'
      {
        expression: "TO_CHAR(date, 'IW-YYYY')",
        order_expression: "TO_DATE(CONCAT(SPLIT_PART(TO_CHAR(date, 'IW-YYYY'), '-', 2), SPLIT_PART(TO_CHAR(date, 'IW-YYYY'), '-', 1)), 'IYYYIW')"
      }
    when 'month'
      {
        expression: "TO_CHAR(date, 'MM/YYYY')",
        order_expression: "TO_DATE(TO_CHAR(date, 'MM/YYYY'), 'MM/YYYY')"
      }
    when 'year'
      {
        expression: "TO_CHAR(date, 'YYYY')",
        order_expression: "TO_DATE(TO_CHAR(date, 'YYYY'), 'YYYY')"
      }
    else
      raise ArgumentError, "Invalid frequency: #{frequency}"
    end
  end
end
