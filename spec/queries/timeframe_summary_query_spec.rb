# spec/queries/timeframe_summary_query_spec.rb
require 'rails_helper'

RSpec.describe TimeframeSummaryQuery do
  before do
    create(:transaction, amount_debit: 100, date: Date.new(2024, 1, 5))
    create(:transaction, amount_debit: 50, date: Date.new(2024, 1, 15))
    create(:transaction, amount_debit: 75, date: Date.new(2024, 2, 10))
  end

  describe '#call' do
    it 'returns summary grouped by timeframe' do
      result = described_class.new(
        date: '01-2024',
        time_frame: 'month'
      ).call

      expect(result.count).to eq(1)
      expect(result.first.total_debit).to eq(150.0)
    end

    it 'uses date_trunc for grouping' do
      result = described_class.new(
        date: '2024',
        time_frame: 'year'
      ).call

      expect(result.count).to eq(1)
      expect(result.first.total_debit).to eq(225.0)
    end

    it 'returns results ordered by period' do
      result = described_class.new(
        date: '2024',
        time_frame: 'year'
      ).call

      expect(result).to be_an(Array)
      expect(result.first).to respond_to(:period_start)
      expect(result.first).to respond_to(:total_debit)
    end

    it 'handles different timeframes' do
      day_result = described_class.new(
        date: '2024-01-05',
        time_frame: 'day'
      ).call

      expect(day_result.count).to eq(1)
      expect(day_result.first.total_debit).to eq(100.0)
    end

    it 'filters by date range correctly' do
      result = described_class.new(
        date: '01-2024',
        time_frame: 'month'
      ).call

      # Should only include January transactions
      expect(result.count).to eq(1)
      expect(result.first.total_debit).to eq(150.0)
    end

    context 'with invalid timeframe' do
      it 'raises ArgumentError' do
        expect {
          described_class.new(
            date: '2024-01-01',
            time_frame: 'invalid'
          ).call
        }.to raise_error(ArgumentError, /Invalid timeframe/)
      end

      it 'protects against SQL injection' do
        expect {
          described_class.new(
            date: '2024-01-01',
            time_frame: "day'; DROP TABLE transactions; --"
          ).call
        }.to raise_error(ArgumentError)
      end
    end

    context 'with plural timeframe' do
      it 'handles plural forms' do
        result = described_class.new(
          date: '01-2024',
          time_frame: 'months' # Plural form
        ).call

        expect(result.count).to eq(1)
      end
    end
  end
end