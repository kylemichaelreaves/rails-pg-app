# Mirrors the finance tables that live in the personal RDS instance owned by the
# `transactions-bucket-to-db` ingestion Lambda (and read by `resourceQuerier`).
#
# Sources of truth for the column shapes:
#   - transactions-bucket-to-db/tests/integration/fixtures/prod_schema.sql  (pg_dump of RDS)
#   - resourceQuerier/db/schema.sql  (users / budget_categories, which the pg_dump omitted)
#
# Divergences from RDS that are intentional here:
#   - RDS uses Postgres `updated_at` triggers (update_updated_at_column()). We rely on
#     Rails' ActiveRecord timestamp handling instead of recreating the trigger function,
#     so this stays in the default :ruby schema format.
#   - Integer (serial) primary keys are used to match RDS rather than Rails' bigint default.
class CreateTransactionsSchema < ActiveRecord::Migration[7.0]
  def change
    # --- users -------------------------------------------------------------
    # RDS omitted users from the pg_dump; shape taken from resourceQuerier/db/schema.sql.
    create_table :users, id: :serial do |t|
      t.string   :username, limit: 255, null: false
      t.string   :email,    limit: 255, null: false
      t.string   :password, limit: 255, null: false
      t.integer  :role_id
      t.string   :status, limit: 255
      t.string   :first_name, limit: 255
      t.string   :last_name,  limit: 255
      t.string   :password_reset_token_hash, limit: 64
      t.timestamptz :password_reset_expires_at
      t.timestamptz :password_reset_requested_at
      t.datetime :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.datetime :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
    end
    add_index :users, :username, unique: true, name: 'users_username_key'
    add_index :users, 'lower(email)', unique: true, name: 'users_email_lower_idx'
    add_index :users, :password_reset_token_hash,
              where: 'password_reset_token_hash IS NOT NULL',
              name: 'users_password_reset_token_hash_idx'

    # --- memos -------------------------------------------------------------
    create_table :memos, id: :serial do |t|
      t.text     :name
      t.text     :budget_category
      t.boolean  :necessary, default: false, null: false
      t.boolean  :recurring, default: false, null: false
      t.string   :frequency
      t.boolean  :ambiguous, default: false
      t.string   :avatar_s3_url, limit: 500
      t.datetime :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.datetime :updated_at
      t.integer  :user_id, null: false
    end
    add_index :memos, :name, unique: true, name: 'memos_memo_key'
    add_index :memos, :user_id, name: 'memos_user_id_idx'
    add_foreign_key :memos, :users
    add_check_constraint :memos,
                         '(recurring = false AND frequency IS NULL) OR (recurring = true AND frequency IS NOT NULL)',
                         name: 'recurring_frequency_check'

    # --- transactions ------------------------------------------------------
    create_table :transactions, id: :serial do |t|
      t.text    :transaction_number
      t.datetime :date
      t.text    :description
      t.text    :memo
      t.integer :memo_id
      t.float   :amount_debit
      t.float   :amount_credit
      t.float   :balance
      t.float   :check_number
      t.float   :fees
      t.text    :budget_category
      t.datetime :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.datetime :updated_at
      t.integer :user_id, null: false
    end
    # Business key for idempotent upsert — matches the RDS
    # `unique_transaction_business_key` constraint and the ingester's BUSINESS_KEY.
    add_index :transactions, %i[transaction_number date memo amount_debit],
              unique: true, name: 'unique_transaction_business_key'
    add_index :transactions, :user_id, name: 'transactions_user_id_idx'
    add_index :transactions, [:user_id, :date], order: { date: :desc },
              name: 'transactions_user_id_date_idx'
    add_foreign_key :transactions, :users

    # --- pending_transactions ---------------------------------------------
    create_table :pending_transactions, id: :serial do |t|
      t.string   :memo, limit: 255, null: false
      t.decimal  :amount_debit, precision: 10, scale: 2
      t.date     :date, null: false
      t.jsonb    :transaction_data, null: false
      t.string   :status, limit: 20, default: 'pending'
      t.string   :assigned_category, limit: 100
      t.datetime :reviewed_at
      t.datetime :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.integer  :user_id, null: false
    end
    add_index :pending_transactions, :created_at, order: { created_at: :desc }, name: 'idx_pending_reviews_created'
    add_index :pending_transactions, :memo, name: 'idx_pending_reviews_memo'
    add_index :pending_transactions, :status, name: 'idx_pending_reviews_status'
    add_index :pending_transactions, :user_id, name: 'pending_transactions_user_id_idx'
    add_foreign_key :pending_transactions, :users
    add_check_constraint :pending_transactions,
                         "status IN ('pending', 'reviewed')",
                         name: 'pending_transactions_status_check'

    # --- budget_categories -------------------------------------------------
    # Shape from resourceQuerier/db/schema.sql (per-user singleton JSONB tree).
    create_table :budget_categories, id: :serial do |t|
      t.integer :user_id, null: false
      t.jsonb   :data, null: false
    end
    add_index :budget_categories, :user_id, unique: true, name: 'budget_categories_user_id_idx'
    add_foreign_key :budget_categories, :users
  end
end
