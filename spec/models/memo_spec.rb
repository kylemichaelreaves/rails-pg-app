require 'rails_helper'

RSpec.describe Memo, type: :model do
  describe 'associations' do
    it { should have_many(:transactions) }
  end

  describe 'validations' do
    subject { build(:memo) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe '#total_amount_debit' do
    let(:memo) { create(:memo) }

    context 'when memo has no transactions' do
      it 'returns 0' do
        expect(memo.total_amount_debit).to eq(0)
      end
    end

    context 'when memo has transactions with debit amounts' do
      before do
        create(:transaction, memo: memo, amount_debit: -100.00)
        create(:transaction, memo: memo, amount_debit: -50.00)
        create(:transaction, memo: memo, amount_debit: -25.00)
      end

      it 'returns the sum of all debit amounts' do
        expect(memo.total_amount_debit).to eq(-175.00)
      end
    end

    context 'when memo has mixed debit and credit transactions' do
      before do
        create(:transaction, memo: memo, amount_debit: -100.00)
        create(:transaction, memo: memo, amount_debit: 50.00)
      end

      it 'sums all debit amounts including positive values' do
        expect(memo.total_amount_debit).to eq(-50.00)
      end
    end
  end

  describe '#total_amount_credit' do
    let(:memo) { create(:memo) }

    context 'when memo has no transactions' do
      it 'returns 0' do
        expect(memo.total_amount_credit).to eq(0)
      end
    end

    context 'when memo has transactions with credit amounts' do
      before do
        create(:transaction, memo: memo, amount_credit: 100.00)
        create(:transaction, memo: memo, amount_credit: 50.00)
        create(:transaction, memo: memo, amount_credit: 25.00)
      end

      it 'returns the sum of all credit amounts' do
        expect(memo.total_amount_credit).to eq(175.00)
      end
    end
  end

  describe '#total_transactions' do
    let(:memo) { create(:memo) }

    context 'when memo has no transactions' do
      it 'returns 0' do
        expect(memo.total_transactions).to eq(0)
      end
    end

    context 'when memo has multiple transactions' do
      before do
        create_list(:transaction, 5, memo: memo)
      end

      it 'returns the count of transactions' do
        expect(memo.total_transactions).to eq(5)
      end
    end
  end

  describe 'budget_category attribute' do
    context 'when memo has a budget category string' do
      let(:memo) { create(:memo, budget_category: 'Food/Groceries') }

      it 'stores the budget category as text' do
        expect(memo.budget_category).to eq('Food/Groceries')
      end
    end

    context 'when memo does not have a budget category' do
      let(:memo) { create(:memo, budget_category: nil) }

      it 'allows nil budget category' do
        expect(memo.budget_category).to be_nil
        expect(memo).to be_valid
      end
    end
  end
end
