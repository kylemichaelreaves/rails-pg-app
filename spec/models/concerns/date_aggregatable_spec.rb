# frozen_string_literal: true

require 'rails_helper'

# spec/models/concerns/date_aggregatable_spec.rb
RSpec.describe DateAggregatable do
  let(:model) { Transaction }

  before do
    create(:transaction, date: Date.new(2024, 1, 15))
    create(:transaction, date: Date.new(2024, 1, 20))
    create(:transaction, date: Date.new(2024, 2, 10))
  end

  describe '.distinct_days' do
    it 'returns distinct days' do
      result = model.distinct_days

      expect(result.count).to eq(3)
      expect(result.first).to have_key('day')
    end

    it 'returns days in descending order' do
      result = model.distinct_days

      expect(result.first['day']).to be > result.last['day']
    end
  end

  describe '.distinct_months' do
    it 'returns distinct months' do
      result = model.distinct_months

      expect(result.count).to eq(2)
      expect(result.first).to have_key('month_year')
    end

    it 'formats as MM-YYYY' do
      result = model.distinct_months

      expect(result.first['month_year']).to match(/\d{2}-\d{4}/)
    end
  end

  describe '.distinct_weeks' do
    it 'returns distinct weeks' do
      result = model.distinct_weeks

      expect(result).to be_an(Array)
      expect(result.first).to have_key('week_year')
    end

    it 'formats as IW-IYYY' do
      result = model.distinct_weeks

      expect(result.first['week_year']).to match(/\d{2}-\d{4}/)
    end
  end

  describe '.distinct_years' do
    it 'returns distinct years' do
      result = model.distinct_years

      expect(result.count).to eq(1)
      expect(result.first['year']).to eq('2024')
    end
  end
end