# frozen_string_literal: true

# spec/services/timeframe_service_spec.rb
require 'rails_helper'

RSpec.describe TimeframeService do
  describe '.calculate' do
    context 'for day timeframe' do
      it 'returns correct day range' do
        date = '2024-01-15'
        result = described_class.calculate('day', date)

        expect(result[:start_date]).to eq(Date.parse('2024-01-15').beginning_of_day)
        expect(result[:end_date]).to eq(Date.parse('2024-01-15').end_of_day)
        expect(result[:timeframe_expression]).to eq('date')
        expect(result[:timeframe_number_expression]).to eq('EXTRACT(DOY FROM date)')
      end
    end

    context 'for week timeframe' do
      it 'returns correct week range' do
        date = '03-2024' # Week 3 of 2024
        result = described_class.calculate('week', date)

        # Parse the expected date to compare properly
        expected_date = TimeframeDateParser.parse('week', '03-2024')

        expect(result[:start_date]).to eq(expected_date.beginning_of_week)
        expect(result[:end_date]).to eq(expected_date.end_of_week)
        expect(result[:timeframe_expression]).to eq('date')
      end
    end

    context 'for month timeframe' do
      it 'returns correct month range' do
        date = '01-2024'
        result = described_class.calculate('month', date)

        expect(result[:start_date]).to eq(Date.parse('2024-01-01').beginning_of_month)
        expect(result[:end_date]).to eq(Date.parse('2024-01-31').end_of_month)
      end
    end

    context 'for year timeframe' do
      it 'returns correct year range' do
        date = '2024'
        result = described_class.calculate('year', date)

        expect(result[:start_date]).to eq(Date.parse('2024-01-01').beginning_of_year)
        expect(result[:end_date]).to eq(Date.parse('2024-12-31').end_of_year)
      end
    end

    context 'with no date provided' do
      it 'uses current date' do
        result = described_class.calculate('day')

        expect(result[:start_date]).to eq(Date.current.beginning_of_day)
      end
    end

    context 'with invalid timeframe' do
      it 'raises ArgumentError' do
        expect {
          described_class.calculate('invalid', '2024-01-01')
        }.to raise_error(ArgumentError, /Invalid timeframe/)
      end
    end

    context 'with invalid date' do
      it 'raises ArgumentError' do
        expect {
          described_class.calculate('day', 'invalid-date')
        }.to raise_error(ArgumentError, /Invalid date/)
      end
    end
  end
end