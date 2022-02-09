require 'csv'
require 'open-uri'
require 'geocoder'

# raw_csv_path = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/raw_csv/0906demo191023.csv")

# csv = CSV.parse(raw_csv_path, headers: true, liberal_parsing: true)
# owners_names = csv["Owner's Name"]

# unique_landlord_names = Property.pluck(:owner_name).uniq

# property_location = csv["Property Location"]
# city_state_zip = csv['City/State/Zip']
# owners_mailing_address = csv["Owner's Mailing Address"]

# city_state_array = []
# city_state = city_state_zip.each { |n| city_state_array << n.scan(/\D/).join('').strip }

# city_array = []
# state_array = []
# zip_array = []
# regex for capturing everything before a comma /[^,]*/
# city_state_array.each { |n| city_array << n.scan(/[^,]*/)[0].strip }
# city_state_array.each { |n| state_array << n.scan(/[^,]*/)[-1].gsub(/[^[:word:]\s]/, '').strip }
# city_state_array.each { |n| zip_array << n.scan(/\d/).join('') }

# for name in owners_names
#    byebug
#    puts name if name.include?('&')
# end

# CSV.foreach("/Users/kylereaves/src/landlord_data/JerseyCity/jersey_city_private_property.csv", :headers => true) do |row|
#    Property.create!(row.to_hash)
# end

# Property.where(owner_name: name).pluck(:id)

unique_landlord_names = Property.pluck(:owner_name).uniq

# unique_landlord_names.each do |name|
#    ids_properties_owned = Property.where(owner_name: name).pluck(:id)
#    mailing_address = Property.where(owner_name: name).pluck(:owner_mailing_address)
#    city_state_zip = Property.where(owner_name: name).pluck(:city_state_zip)
#    full_mailing_address = Property.where(owner_name: name).pluck(:owner_full_mailing_address)
#    Landlord.create!(
#       name: name,
#       ids_properties_owned: ids_properties_owned,
#       mailing_address: mailing_address[0],
#       city_state_zip: city_state_zip[0],
#       full_mailing_address: full_mailing_address[0]
#                     )
#    puts "Created #{name}!"
# end

# Update the Property Model with the id of the Landlord
unique_landlord_names.each do |n|
   landlord_id = Landlord.where(name: n).pluck(:id)[0]
   byebug
end