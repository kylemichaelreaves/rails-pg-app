module PropertiesHelper
    class OwnerNameValidator < ActiveModel::Validator
        def validate(record)
            # if owner_name has punctuation, or trailing or double spaces
            if Pattern.matches("\\p{Punct}", record)
                record_chars = record.chars
                # if owner_name has an &
                    # replace the & with a comma
            # or spaces longer than a single space
                # swap the multiple spaces for a single space
            if record.owner_name
                record.owner_name = record.owner_name.gsub(/[^a-z0-9\s]/i, '').split.join(', ')


        def malformed?(record)
            record.include? /\s{2,6}/
end
