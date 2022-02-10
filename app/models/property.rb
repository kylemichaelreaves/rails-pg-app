class Property < ApplicationRecord
    has_and_belongs_to_many :landlords, foreign_key: "landlords_id", null: false
end
