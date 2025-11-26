# frozen_string_literal: true

require 'rails_helper'

# spec/queries/transaction_query_spec.rb
RSpec.describe TransactionQuery do
  let(:memo1) { create(:memo, budget_category: 'Food') }
  let(:memo2) { create(:memo, budget_category: 'Transport') }

  before do
    # Create test data
    create(:transaction, memo: memo1, amount_debit: 100, date: Date.new(2024, 1, 15))
    create(:transaction, memo: memo1, amount_debit: 50, date: Date.new(2024, 1, 20))
    create(:transaction, memo: memo2, amount_debit: 75, date: Date.new(2024, 2, 10))
  end

  describe '#call' do
    context 'standard query' do
      it 'returns all transactions ordered by date desc' do
        params = {}
        result = described_class.new(params).call

        expect(result).to be_a(ActiveRecord::Relation)
        expect(result.count).to eq(3)
        expect(result.first.date).to be > result.last.date
      end

      it 'includes memo and budget_category associations' do
        params = {}
        result = described_class.new(params).call

        expect(result.first.association(:memo)).to be_loaded
      end
    end

    context 'aggregation query' do
      it 'returns sum of amount_debit' do
        params = { total_amount_debit: 'true' }
        result = described_class.new(params).call

        expect(result).to eq([{ total_amount_debit: 225.0 }])
      end

      it 'filters by timeframe' do
        params = {
          total_amount_debit: 'true',
          time_frame: 'month',
          date: '01-2024'
        }
        result = described_class.new(params).call

        expect(result).to eq([{ total_amount_debit: 150.0 }])
      end

      it 'filters by budget category' do
        params = {
          total_amount_debit: 'true',
          budget_category: 'Food'
        }
        result = described_class.new(params).call

        expect(result).to eq([{ total_amount_debit: 150.0 }])
      end
    end

    context 'count query' do
      it 'returns transaction count' do
        params = { count: true }
        result = described_class.new(params).call

        expect(result).to eq(3)
      end

      it 'counts distinct budget categories' do
        params = { count: true, budget_category_summary: true }
        result = described_class.new(params).call

        expect(result).to eq(2)
      end
    end

    context 'with pagination' do
      it 'applies pagination proc when provided' do
        params = {}
        pagination_proc = ->(scope) { scope.limit(2) }
        result = described_class.new(params, pagination_proc).call

        expect(result.count).to eq(2)
      end
    end

    context 'filtering' do
      it 'filters by memo_id' do
        params = { memo_id: memo1.id }
        result = described_class.new(params).call

        expect(result.count).to eq(2)
        expect(result.all? { |t| t.memo_id == memo1.id }).to be true
      end

      it 'filters by budget_category' do
        params = { budget_category: 'Food' }
        result = described_class.new(params).call

        expect(result.count).to eq(2)
      end

      it 'filters by timeframe and date' do
        params = {
          time_frame: 'month',
          date: '01-2024'
        }
        result = described_class.new(params).call

        expect(result.count).to eq(2)
        expect(result.all? { |t| t.date.month == 1 }).to be true
      end
    end
  end
end