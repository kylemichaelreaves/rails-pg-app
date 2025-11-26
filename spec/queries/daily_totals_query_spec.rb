# frozen_string_literal: true

require 'rails_helper'

# spec/queries/daily_totals_query_spec.rb
RSpec.describe DailyTotalsQuery do
  before do
    create(:transaction, amount_debit: 100, date: 5.days.ago.to_date)
    create(:transaction, amount_debit: 50, date: 3.days.ago.to_date)
    create(:transaction, amount_debit: 75, date: 1.day.ago.to_date)
    create(:transaction, amount_debit: 25, date: 30.days.ago.to_date)
  end

  describe '#call' do
    context 'with date parameter' do
      it 'returns daily totals within interval from date' do
        result = described_class.new(
          interval: '7 days',
          date: Date.current.to_s
        ).call

        # Use .to_a.count or .length instead of .count
        expect(result.to_a.count).to eq(3)
      end

      it 'accepts different interval formats' do
        expect {
          described_class.new(interval: '1 week', date: Date.current.to_s).call.to_a
        }.not_to raise_error

        expect {
          described_class.new(interval: '30 days', date: Date.current.to_s).call.to_a
        }.not_to raise_error

        expect {
          described_class.new(interval: '3 months', date: Date.current.to_s).call.to_a
        }.not_to raise_error
      end
    end

    context 'without date parameter' do
      it 'returns daily totals from most recent transaction' do
        result = described_class.new(interval: '7 days').call

        # Use .to_a.count or .length instead of .count
        expect(result.to_a.count).to eq(3)
      end
    end

    context 'with invalid interval' do
      it 'raises ArgumentError' do
        expect {
          described_class.new(interval: 'invalid', date: Date.current.to_s).call
        }.to raise_error(ArgumentError, /Invalid interval format/)
      end

      it 'protects against SQL injection' do
        expect {
          described_class.new(
            interval: "1 day'; DROP TABLE transactions; --",
            date: Date.current.to_s
          ).call
        }.to raise_error(ArgumentError)
      end
    end

    it 'groups by date and sums amount_debit' do
      result = described_class.new(
        interval: '7 days',
        date: Date.current.to_s
      ).call.to_a

      expect(result.first).to respond_to(:date)
      expect(result.first).to respond_to(:total_amount_debit)
    end

    it 'orders results by date ascending' do
      result = described_class.new(
        interval: '7 days',
        date: Date.current.to_s
      ).call.to_a

      dates = result.map { |r| r.date }
      expect(dates).to eq(dates.sort)
    end

    it 'calculates correct sums per day' do
      result = described_class.new(
        interval: '7 days',
        date: Date.current.to_s
      ).call.to_a

      # Verify the sums are correct
      expect(result.map(&:total_amount_debit).sum).to eq(225.0)
    end
  end
end