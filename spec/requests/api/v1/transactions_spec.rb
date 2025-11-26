# frozen_string_literal: true

require 'rails_helper'

# spec/requests/api/v1/transactions_spec.rb
RSpec.describe 'Api::V1::Transactions', type: :request do
  let(:memo) { create(:memo) }

  before do
    create_list(:transaction, 5, memo: memo, date: Date.new(2024, 1, 15))
  end

  describe 'GET /api/v1/transactions' do
    it 'returns transactions' do
      get '/api/v1/transactions'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end

    it 'returns sum when total_amount_debit param is true' do
      get '/api/v1/transactions', params: { total_amount_debit: true }

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.first).to have_key('total_amount_debit')
    end

    it 'filters by timeframe' do
      create(:transaction, memo: memo, date: Date.new(2024, 2, 15))

      get '/api/v1/transactions', params: {
        time_frame: 'month',
        date: '01-2024'
      }

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(5)
    end
  end

  describe 'GET /api/v1/transactions/months' do
    it 'returns distinct months' do
      get '/api/v1/transactions/months'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.first).to have_key('month_year')
    end
  end

  describe 'GET /api/v1/transactions/:timeframe/:date/summary' do
    it 'returns timeframe summary' do
      get '/api/v1/transactions/month/01-2024/summary'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
    end
  end
end