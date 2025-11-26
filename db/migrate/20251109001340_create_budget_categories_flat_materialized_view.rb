class CreateBudgetCategoriesFlatMaterializedView < ActiveRecord::Migration[8.1]
  def up
    execute <<-SQL
      CREATE MATERIALIZED VIEW budget_categories_flat AS
      WITH RECURSIVE category_tree AS (
        -- Base case: top-level categories
        SELECT#{' '}
          bc.id as source_id,
          key as category_name,
          key as full_path,
          1 as level,
          NULL::text as parent_path,
          key as sort_path,
          value as children
        FROM budget_categories bc,
        LATERAL jsonb_each(bc.data)
      #{'  '}
        UNION ALL
      #{'  '}
        -- Recursive case: nested categories
        SELECT
          ct.source_id,
          sub.key,
          ct.full_path || ' - ' || sub.key,
          ct.level + 1,
          ct.full_path,
          ct.sort_path || ' | ' || sub.key,
          sub.value
        FROM category_tree ct
        CROSS JOIN LATERAL jsonb_each(ct.children) sub
        WHERE jsonb_typeof(ct.children) = 'object'#{' '}
          AND ct.children != '{}'::jsonb
          AND ct.level < 3  -- prevent infinite recursion
      ),
      numbered_categories AS (
        SELECT
          ROW_NUMBER() OVER (ORDER BY sort_path) as category_id,
          source_id,
          category_name,
          full_path,
          level,
          parent_path
        FROM category_tree
      )
      SELECT#{' '}
        nc1.category_id,
        nc1.source_id,
        nc1.category_name,
        nc1.full_path,
        nc1.level,
        nc2.category_id as parent_id
      FROM numbered_categories nc1
      LEFT JOIN numbered_categories nc2 ON nc1.parent_path = nc2.full_path
      ORDER BY nc1.category_id;

      -- Create indexes
      CREATE UNIQUE INDEX idx_budget_categories_flat_category_id#{' '}
        ON budget_categories_flat(category_id);
      CREATE INDEX idx_budget_categories_flat_source_id#{' '}
        ON budget_categories_flat(source_id);
      CREATE INDEX idx_budget_categories_flat_parent_id#{' '}
        ON budget_categories_flat(parent_id);
      CREATE INDEX idx_budget_categories_flat_level#{' '}
        ON budget_categories_flat(level);
      CREATE INDEX idx_budget_categories_flat_category_name#{' '}
        ON budget_categories_flat(category_name);
    SQL
  end

  def down
    execute 'DROP MATERIALIZED VIEW IF EXISTS budget_categories_flat CASCADE;'
  end
end

