require 'rails_helper'

RSpec.describe BudgetCategoryFlat, type: :model do
  describe 'configuration' do
    it 'uses category_id as primary key' do
      expect(described_class.primary_key).to eq('category_id')
    end

    it 'is readonly', :skip_if_no_materialized_view do
      skip "Materialized view doesn't exist in test database" unless materialized_view_exists?
      instance = described_class.new
      expect(instance.readonly?).to be true
    end
  end

  describe '.refresh!' do
    it 'refreshes the materialized view concurrently by default' do
      expect(described_class.connection).to receive(:execute)
                                              .with('REFRESH MATERIALIZED VIEW CONCURRENTLY budget_categories_flat')

      described_class.refresh!
    end

    it 'refreshes the materialized view without concurrently option when specified' do
      expect(described_class.connection).to receive(:execute)
                                              .with('REFRESH MATERIALIZED VIEW budget_categories_flat')

      described_class.refresh!(concurrently: false)
    end
  end

  describe 'scopes' do
    describe '.root_categories' do
      it 'filters categories by level 1' do
        skip "Materialized view doesn't exist in test database" unless materialized_view_exists?
        scope = described_class.root_categories
        expect(scope.to_sql).to include('level')
        expect(scope.to_sql).to include('1')
      end
    end

    describe '.by_level' do
      it 'filters categories by specified level' do
        skip "Materialized view doesn't exist in test database" unless materialized_view_exists?
        scope = described_class.by_level(2)
        expect(scope.to_sql).to include('level')
        expect(scope.to_sql).to include('2')
      end
    end
  end

  private

  def materialized_view_exists?
    ActiveRecord::Base.connection.execute(
      "SELECT EXISTS (SELECT FROM pg_matviews WHERE matviewname = 'budget_categories_flat')"
    ).first['exists']
  end
end
