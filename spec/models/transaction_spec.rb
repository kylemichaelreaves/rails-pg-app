require 'rails_helper'

RSpec.describe Transaction, type: :model do
  describe 'associations' do
    it { should belong_to(:memo) }
    it { should belong_to(:budget_category).optional }
  end

  describe 'validations' do
    it { should validate_presence_of(:transaction_number) }
  end

  describe '#student_loan?' do
    context 'when memo name is Aidvantage' do
      it 'returns true' do
        transaction = create(:transaction, :student_loan)
        expect(transaction.student_loan?).to be true
      end
    end

    context 'when memo name is not Aidvantage' do
      it 'returns false' do
        memo = create(:memo, name: 'Target')
        transaction = create(:transaction, memo: memo)
        expect(transaction.student_loan?).to be false
      end
    end
  end

  describe '#car_loan?' do
    context 'when memo name is JP Morgan Chase' do
      it 'returns true' do
        transaction = create(:transaction, :car_loan)
        expect(transaction.car_loan?).to be true
      end
    end

    context 'when memo name is not JP Morgan Chase' do
      it 'returns false' do
        memo = create(:memo, name: 'Walmart')
        transaction = create(:transaction, memo: memo)
        expect(transaction.car_loan?).to be false
      end
    end
  end

  describe '.memos_summary_for_timeframe' do
    let(:memo1) { create(:memo, name: 'Grocery Store') }
    let(:memo2) { create(:memo, name: 'Gas Station') }
    let(:budget_category) { create(:budget_category, name: 'Food/Groceries') }

    before do
      skip "Requires budget_categories_flat materialized view" unless materialized_view_exists?

      # Create transactions for this month
      create(:transaction,
             memo: memo1,
             amount_debit: -100.00,
             date: Date.today,
             budget_category: budget_category
      )
      create(:transaction,
             memo: memo1,
             amount_debit: -50.00,
             date: Date.today
      )
      create(:transaction,
             memo: memo2,
             amount_debit: -75.00,
             date: Date.today
      )

      # Create transaction for last month (should not be included)
      create(:transaction,
             memo: memo1,
             amount_debit: -200.00,
             date: 1.month.ago
      )

      # Create credit transaction (should not be included)
      create(:transaction,
             memo: memo1,
             amount_debit: 50.00,
             date: Date.today
      )
    end

    it 'returns transactions grouped by memo for the specified timeframe' do
      # Use correct format for month: MM-YYYY
      date_string = Date.today.strftime('%m-%Y')
      results = Transaction.memos_summary_for_timeframe('month', date_string)

      expect(results).not_to be_empty
      expect(results.length).to eq(2)

      # Check that results are ordered by total_amount_debit (most negative first)
      first_result = results.first
      expect(first_result['total_amount_debit'].to_f).to be < 0
    end

    it 'only includes debit transactions (negative amounts)' do
      date_string = Date.today.strftime('%m-%Y')
      results = Transaction.memos_summary_for_timeframe('month', date_string)

      results.each do |result|
        expect(result['total_amount_debit'].to_f).to be < 0
      end
    end

    it 'sums amount_debit for each memo' do
      date_string = Date.today.strftime('%m-%Y')
      results = Transaction.memos_summary_for_timeframe('month', date_string)

      grocery_result = results.find { |r| r['memo'] == 'Grocery Store' }
      expect(grocery_result['total_amount_debit'].to_f).to eq(-150.00)

      gas_result = results.find { |r| r['memo'] == 'Gas Station' }
      expect(gas_result['total_amount_debit'].to_f).to eq(-75.00)
    end

    it 'excludes transactions with nil memo' do
      create(:transaction, memo: nil, amount_debit: -100.00, date: Date.today) rescue nil

      date_string = Date.today.strftime('%m-%Y')
      results = Transaction.memos_summary_for_timeframe('month', date_string)

      expect(results.none? { |r| r['memo'].nil? }).to be true
    end
  end

  def materialized_view_exists?
    ActiveRecord::Base.connection.execute(
      "SELECT EXISTS (SELECT FROM pg_matviews WHERE matviewname = 'budget_categories_flat')"
    ).first['exists']
  end

  describe 'DateAggregatable concern' do
    it 'includes DateAggregatable' do
      expect(Transaction.ancestors).to include(DateAggregatable)
    end
  end
end
