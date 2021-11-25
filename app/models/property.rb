class Property < ApplicationRecord
    has_one :landlord, :index { unique: true }, foreign_key: true
end
