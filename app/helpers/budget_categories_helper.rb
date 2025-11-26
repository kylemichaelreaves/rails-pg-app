# frozen_string_literal: true

module BudgetCategoriesHelper
  # app/helpers/budget_categories_helper.rb
  class BudgetCategoriesImporter
    class << self
      def grab_categories_from_rds
        ConsoleLogger.section('Importing Budget Categories from RDS') do
          with_rds_connection do |connection|
            categories_data = fetch_from_rds(connection)
            return handle_no_data if categories_data.empty?

            process_categories(categories_data)
          end
        end
      end

      private

      def handle_no_data
        ConsoleLogger.warning('No budget categories found in RDS')
        nil
      end

      def process_categories(categories_data)
        import_to_local(categories_data)
        refresh_materialized_view
        print_summary
      end

      def with_rds_connection
        connection = establish_rds_connection
        yield connection
      ensure
        cleanup_connection(connection)
      end

      def cleanup_connection(connection)
        connection&.disconnect!
        ActiveRecord::Base.establish_connection(Rails.env.to_sym)
      end

      def establish_rds_connection
        ConsoleLogger.info('Connecting to RDS...')

        config = {
          adapter: 'postgresql',
          encoding: 'unicode',
          host: ENV['RDS_HOST'],
          port: ENV['RDS_PORT'] || 5432,
          database: ENV['RDS_DATABASE'],
          username: ENV['RDS_USERNAME'],
          password: ENV['RDS_PASSWORD'],
          pool: 5
        }

        ActiveRecord::Base.establish_connection(config)
      end

      def fetch_from_rds(connection)
        ConsoleLogger.info('Fetching budget categories from RDS...')

        result = connection.connection.exec_query(
          'SELECT id, data, created_at, updated_at FROM budget_categories ORDER BY id'
        )

        ConsoleLogger.info("Found #{result.count} budget_categories record(s)")
        result.to_a
      end

      def import_to_local(categories_data)
        ActiveRecord::Base.establish_connection(Rails.env.to_sym)

        clear_existing_data
        insert_categories(categories_data)
        reset_sequence

        ConsoleLogger.success("Imported #{categories_data.size} budget_categories record(s)")
      end

      def clear_existing_data
        ConsoleLogger.info('Clearing existing budget_categories...')
        BudgetCategory.delete_all
      end

      def insert_categories(categories_data)
        ConsoleLogger.info('Importing budget_categories...')
        categories_data.each do |row|
          BudgetCategory.create!(
            id: row['id'],
            data: row['data'],
            created_at: row['created_at'],
            updated_at: row['updated_at']
          )
        end
      end

      def reset_sequence
        ActiveRecord::Base.connection.reset_pk_sequence!('budget_categories')
      end

      def refresh_materialized_view
        return unless materialized_view_exists?

        ConsoleLogger.info('Refreshing budget_categories_flat materialized view...')
        BudgetCategoryFlat.refresh!(concurrently: false)
        ConsoleLogger.success("Materialized view refreshed (#{BudgetCategoryFlat.count} categories)")
      end

      def materialized_view_exists?
        result = ActiveRecord::Base.connection.execute(
          "SELECT EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'budget_categories_flat')"
        ).first['exists']

        unless result
          ConsoleLogger.warning('Materialized view not yet created. Run migrations first.')
        end

        result
      end

      def print_summary
        categories_count = BudgetCategory.count

        summary_items = {
          'Budget Categories in DB' => categories_count
        }

        if BudgetCategoryFlat.table_exists?
          summary_items.merge!(
            'Flattened Categories' => BudgetCategoryFlat.count,
            'Root Categories' => BudgetCategoryFlat.root_categories.count,
            'Max Nesting Level' => BudgetCategoryFlat.maximum(:level)
          )
        end

        ConsoleLogger.print_summary('Summary', summary_items)
      end
    end
  end
end

