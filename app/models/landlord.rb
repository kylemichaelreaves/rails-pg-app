class Landlord < ApplicationRecord
    has_many :properties, foreign_key: 'ids'
end
