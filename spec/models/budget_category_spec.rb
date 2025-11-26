require 'rails_helper'

RSpec.describe BudgetCategory, type: :model do
  describe 'associations' do
    it { should have_many(:transactions) }
  end

  describe 'validations' do
    subject { build(:budget_category) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe 'associations behavior' do
    let(:budget_category) { create(:budget_category, name: 'Food/Groceries') }

    context 'with transactions' do
      before do
        create(:transaction, budget_category: budget_category, amount_debit: -50.00)
        create(:transaction, budget_category: budget_category, amount_debit: -75.00)
        create(:transaction, budget_category: budget_category, amount_debit: -100.00)
      end

      it 'has multiple transactions' do
        expect(budget_category.transactions.count).to eq(3)
      end

      it 'can calculate total spending' do
        total_debit = budget_category.transactions.sum(:amount_debit)
        expect(total_debit).to eq(-225.00)
      end
    end

    context 'memos with budget_category text field' do
      let!(:memo1) { create(:memo, budget_category: 'Food/Groceries') }
      let!(:memo2) { create(:memo, budget_category: 'Food/Groceries') }
      let!(:memo3) { create(:memo, budget_category: 'Transportation') }

      it 'can find memos by budget_category text match' do
        matching_memos = Memo.where(budget_category: 'Food/Groceries')
        expect(matching_memos.count).to eq(2)
        expect(matching_memos).to include(memo1, memo2)
        expect(matching_memos).not_to include(memo3)
      end
    end
  end

  describe 'uniqueness' do
    let!(:existing_category) { create(:budget_category, name: 'Transportation') }

    it 'does not allow duplicate names' do
      duplicate_category = build(:budget_category, name: 'Transportation')
      expect(duplicate_category).not_to be_valid
      expect(duplicate_category.errors[:name]).to include('has already been taken')
    end

    it 'allows different names' do
      new_category = build(:budget_category, name: 'Entertainment')
      expect(new_category).to be_valid
    end
  end
end
