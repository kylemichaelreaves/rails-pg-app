require 'geocoder'

module PropertiesHelper
    class PropertiesValidator < ActiveModel::Validator
        def validate(record)
            # if not record.g_code
                # record.g_code = Geocoder.search(record.property_full_address)

        end
    end
end
