class Transaction < ApplicationRecord
  belongs_to :user
  # `memo` is a text column on this table; the FK to the memos table is `memo_id`,
  # so the association is named `memo_record` to avoid shadowing the column accessor.
  belongs_to :memo_record, class_name: 'Memo', foreign_key: :memo_id, optional: true

  # Columns that uniquely identify a transaction. Mirrors the RDS
  # `unique_transaction_business_key` constraint and the ingester's BUSINESS_KEY.
  BUSINESS_KEY = %i[transaction_number date memo amount_debit].freeze
end
