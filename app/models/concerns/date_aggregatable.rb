# app/models/concerns/date_aggregatable.rb
module DateAggregatable
  extend ActiveSupport::Concern

  class_methods do
    def distinct_days
      connection.execute(<<-SQL.squish).to_a
        SELECT day
        FROM (
          SELECT DISTINCT TO_CHAR(date, 'YYYY-MM-DD') AS day
          FROM transactions
        ) AS subquery
        ORDER BY day DESC
      SQL
    end

    def distinct_weeks
      connection.execute(<<-SQL.squish).to_a
        SELECT week_year
        FROM (
          SELECT DISTINCT TO_CHAR(DATE_TRUNC('week', date), 'IW-IYYY') AS week_year
          FROM transactions
        ) AS subquery
        ORDER BY#{' '}
          SPLIT_PART(week_year, '-', 2)::INTEGER DESC,
          SPLIT_PART(week_year, '-', 1)::INTEGER DESC
      SQL
    end

    def distinct_months
      connection.execute(<<-SQL.squish).to_a
        SELECT month_year
        FROM (
          SELECT DISTINCT TO_CHAR(DATE_TRUNC('month', date), 'MM-YYYY') AS month_year
          FROM transactions
        ) AS subquery
        ORDER BY TO_DATE(month_year, 'MM-YYYY') DESC
      SQL
    end

    def distinct_years
      connection.execute(<<-SQL.squish).to_a
        SELECT year
        FROM (
          SELECT DISTINCT TO_CHAR(DATE_TRUNC('year', date), 'YYYY') AS year
          FROM transactions
        ) AS subquery
        ORDER BY TO_DATE(year, 'YYYY') DESC
      SQL
    end
  end
end