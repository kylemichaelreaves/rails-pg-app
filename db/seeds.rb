# require "csv"
# require "open-uri"
# require 'geocoder'

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

# unique_landlord_names = Property.pluck(:owner_name).uniq

# unique_landlord_names.each do |name|
#    mailing_address = Property.where(owner_name: name).pluck(:owner_mailing_address)
#    city_state_zip = Property.where(owner_name: name).pluck(:city_state_zip)
#    full_mailing_address = Property.where(owner_name: name).pluck(:owner_full_mailing_address)
#    Landlord.create!(
#       name: name,
#       mailing_address: mailing_address[0],
#       city_state_zip: city_state_zip[0],
#       full_mailing_address: full_mailing_address[0]
#                     )
#    puts "Created #{name}!"
# end

# Update the Property Model with the id of the Landlord
# unique_landlord_names.each do |n|
#    property = Property.where(owner_name: n)
#    landlord_id = Landlord.where(name: n).pluck(:id)[0]
#    puts "#{n} #{landlord_id}"
#    property.update(landlords_id: landlord_id)
#    puts "#{property} updated with #{landlord_id}"
#    puts ""
# end

unique_property_g_code = Property.pluck(:g_code).uniq

unique_property_g_code.each do |g_code|
  street_address = g_code.split(",")[0]
  municipality = "Jersey City"
  state = "New Jersey"
  zipcode = g_code.split(",")[8].strip

  property = Property.where(g_code: g_code)

  new_address = Address.create(
    street_address: street_address,
    municipality: municipality,
    state: state,
    zipcode: zipcode,
    # properties_id: property.pluck(:id)[0],
  )

  puts "Created #{new_address}!"

  # Property.where(g_code: g_code).update(addresses_id: new_address.id)

  # puts "Updated #{g_code}!"
end

# CSV.foreach("/Users/kylereaves/src/landlord_data/JerseyCity/jersey_city_private_property.csv", :headers => true) do |row|
#
# end

# address_csv = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/addresses_df.csv")

# CSV.foreach(address_csv, :headers => true) do |row|
#   Address.create!(row.to_hash)
# end

# address_gcode = csv["address"]
# lat = csv["latitude"]
# lon = csv["longitude"]

# byebug
# get the latitude and longitude associated with the g_code
#   latitude = Property.where(g_code: g_code).pluck(:latitude)
#   longitude = Property.where(g_code: g_code).pluck(:longitude)

# Address.create!(
#   street_address: address_gcode.split(",")[0] + address_gcode.split(",")[1],
#   municipality: address_gcode.split(",")[-5].strip,
#   state: address_gcode.split(",")[-3].strip,
#   zipcode: address_gcode.split(",")[-2].strip,
#   latitude: lat,
#   longitude: lon,
# )

puts "Created #{street_address} as an Address!"
# end
