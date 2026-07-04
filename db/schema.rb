# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_04_000001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "apt_or_unit_number"
    t.datetime "created_at", null: false
    t.string "full_address"
    t.float "latitude"
    t.string "latitude_and_longitude"
    t.float "longitude"
    t.string "municipality"
    t.string "state"
    t.string "street_address"
    t.datetime "updated_at", null: false
    t.string "zipcode"
    t.index ["full_address"], name: "index_addresses_on_full_address", unique: true
    t.index ["latitude_and_longitude"], name: "index_addresses_on_latitude_and_longitude", unique: true
  end

  create_table "addresses_landlords", id: false, force: :cascade do |t|
    t.bigint "address_id", null: false
    t.bigint "landlord_id", null: false
    t.index ["address_id"], name: "index_addresses_landlords_on_address_id"
    t.index ["landlord_id"], name: "index_addresses_landlords_on_landlord_id"
  end

  create_table "addresses_properties", id: false, force: :cascade do |t|
    t.bigint "address_id", null: false
    t.bigint "property_id", null: false
    t.index ["address_id"], name: "index_addresses_properties_on_address_id"
    t.index ["property_id"], name: "index_addresses_properties_on_property_id"
  end

  create_table "budget_categories", id: :serial, force: :cascade do |t|
    t.jsonb "data", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "budget_categories_user_id_idx", unique: true
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "attempts", default: 0, null: false
    t.datetime "created_at"
    t.datetime "failed_at"
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "locked_at"
    t.string "locked_by"
    t.integer "priority", default: 0, null: false
    t.string "queue"
    t.datetime "run_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "landlords", force: :cascade do |t|
    t.string "city_state_zip"
    t.string "full_mailing_address"
    t.string "mailing_address"
    t.string "name"
    t.index ["name"], name: "index_landlords_on_name", unique: true
  end

  create_table "landlords_properties", id: false, force: :cascade do |t|
    t.bigint "landlord_id", null: false
    t.bigint "property_id", null: false
    t.index ["landlord_id"], name: "index_landlords_properties_on_landlord_id"
    t.index ["property_id"], name: "index_landlords_properties_on_property_id"
  end

  create_table "memos", id: :serial, force: :cascade do |t|
    t.boolean "ambiguous", default: false
    t.string "avatar_s3_url", limit: 500
    t.text "budget_category"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.string "frequency"
    t.text "name"
    t.boolean "necessary", default: false, null: false
    t.boolean "recurring", default: false, null: false
    t.datetime "updated_at"
    t.integer "user_id", null: false
    t.index ["name"], name: "memos_memo_key", unique: true
    t.index ["user_id"], name: "memos_user_id_idx"
    t.check_constraint "recurring = false AND frequency IS NULL OR recurring = true AND frequency IS NOT NULL", name: "recurring_frequency_check"
  end

  create_table "pending_transactions", id: :serial, force: :cascade do |t|
    t.decimal "amount_debit", precision: 10, scale: 2
    t.string "assigned_category", limit: 100
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.date "date", null: false
    t.string "memo", limit: 255, null: false
    t.datetime "reviewed_at"
    t.string "status", limit: 20, default: "pending"
    t.jsonb "transaction_data", null: false
    t.integer "user_id", null: false
    t.index ["created_at"], name: "idx_pending_reviews_created", order: :desc
    t.index ["memo"], name: "idx_pending_reviews_memo"
    t.index ["status"], name: "idx_pending_reviews_status"
    t.index ["user_id"], name: "pending_transactions_user_id_idx"
    t.check_constraint "status::text = ANY (ARRAY['pending'::character varying, 'reviewed'::character varying]::text[])", name: "pending_transactions_status_check"
  end

  create_table "properties", force: :cascade do |t|
    t.string "city_state_zip"
    t.datetime "created_at", null: false
    t.text "display_name"
    t.float "latitude"
    t.float "longitude"
    t.string "municipal_code"
    t.string "municipality"
    t.string "owner_full_mailing_address"
    t.string "owner_mailing_address"
    t.string "owner_name"
    t.string "property_full_address"
    t.string "street_address"
    t.integer "units_at_property"
    t.datetime "updated_at", null: false
  end

  create_table "transactions", id: :serial, force: :cascade do |t|
    t.float "amount_credit"
    t.float "amount_debit"
    t.float "balance"
    t.text "budget_category"
    t.float "check_number"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "date"
    t.text "description"
    t.float "fees"
    t.text "memo"
    t.integer "memo_id"
    t.text "transaction_number"
    t.datetime "updated_at"
    t.integer "user_id", null: false
    t.index ["transaction_number", "date", "memo", "amount_debit"], name: "unique_transaction_business_key", unique: true
    t.index ["user_id", "date"], name: "transactions_user_id_date_idx", order: { date: :desc }
    t.index ["user_id"], name: "transactions_user_id_idx"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.string "email", limit: 255, null: false
    t.string "first_name", limit: 255
    t.string "last_name", limit: 255
    t.string "password", limit: 255, null: false
    t.timestamptz "password_reset_expires_at"
    t.timestamptz "password_reset_requested_at"
    t.string "password_reset_token_hash", limit: 64
    t.integer "role_id"
    t.string "status", limit: 255
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.string "username", limit: 255, null: false
    t.index "lower((email)::text)", name: "users_email_lower_idx", unique: true
    t.index ["password_reset_token_hash"], name: "users_password_reset_token_hash_idx", where: "(password_reset_token_hash IS NOT NULL)"
    t.index ["username"], name: "users_username_key", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "budget_categories", "users"
  add_foreign_key "memos", "users"
  add_foreign_key "pending_transactions", "users"
  add_foreign_key "transactions", "users"
end
