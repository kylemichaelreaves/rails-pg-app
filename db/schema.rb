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

ActiveRecord::Schema[7.0].define(version: 2022_09_28_180458) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "street_address"
    t.string "municipality"
    t.string "state"
    t.string "zipcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "longitude"
    t.float "latitude"
    t.string "latitude_and_longitude"
    t.string "full_address"
    t.bigint "property_id"
    t.bigint "landlord_id"
    t.index ["full_address"], name: "index_addresses_on_full_address", unique: true
    t.index ["landlord_id"], name: "index_addresses_on_landlord_id"
    t.index ["latitude_and_longitude"], name: "index_addresses_on_latitude_and_longitude", unique: true
    t.index ["property_id"], name: "index_addresses_on_property_id"
  end

  create_table "addresses_properties", id: false, force: :cascade do |t|
    t.bigint "property_id", null: false
    t.bigint "address_id", null: false
    t.index ["address_id"], name: "index_addresses_properties_on_address_id"
    t.index ["property_id"], name: "index_addresses_properties_on_property_id"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "landlords", force: :cascade do |t|
    t.string "name"
    t.string "mailing_address"
    t.string "city_state_zip"
    t.string "full_mailing_address"
    t.bigint "property_id"
    t.index ["name"], name: "index_landlords_on_name", unique: true
    t.index ["property_id"], name: "index_landlords_on_property_id"
  end

  create_table "landlords_properties", id: false, force: :cascade do |t|
    t.bigint "landlord_id", null: false
    t.bigint "property_id", null: false
    t.index ["landlord_id"], name: "index_landlords_properties_on_landlord_id"
    t.index ["property_id"], name: "index_landlords_properties_on_property_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "street_address"
    t.string "owner_name"
    t.string "owner_mailing_address"
    t.string "city_state_zip"
    t.string "property_full_address"
    t.integer "units_at_property"
    t.text "display_name"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "owner_full_mailing_address"
    t.bigint "landlord_id"
    t.bigint "address_id"
    t.string "municipal_code"
    t.index ["address_id"], name: "index_properties_on_address_id"
    t.index ["landlord_id"], name: "index_properties_on_landlord_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "landlords", on_update: :cascade, on_delete: :cascade
  add_foreign_key "addresses", "properties", on_update: :cascade, on_delete: :cascade
  add_foreign_key "landlords", "properties", on_update: :cascade, on_delete: :cascade
  add_foreign_key "properties", "addresses", on_update: :cascade, on_delete: :cascade
  add_foreign_key "properties", "landlords", on_update: :cascade, on_delete: :cascade
end
