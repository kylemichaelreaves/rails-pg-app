class Landlord < ApplicationRecord
    # no two Landlords can share the same Landlord.name
    validates :name, uniqueness: true

    has_and_belongs_to_many :properties

    def owns_multiple_properties?
    end

    def lives_outside_us?
    end

    def more_than_one_name?
    end


end
