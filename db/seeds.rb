# require "csv"
# require "open-uri"
# require "geocoder"

# iterate through Properties

miscoded_ids = [13778,
                2041,
                2042,
                2043,
                2046,
                13951,
                13952,
                13953,
                13965,
                13982,
                13983,
                13994,
                14004,
                14013,
                14018,
                8454,
                8697,
                8698,
                13628,
                13629,
                13630,
                13633,
                13635,
                13636,
                13638,
                13639,
                13640,
                13654,
                13659,
                13660,
                13681,
                13682,
                13700,
                13702,
                13705,
                13706,
                13708,
                13709,
                13711,
                13713,
                13714,
                13715,
                13716,
                13717,
                13718,
                11035,
                11036,
                11150,
                11151,
                11152,
                11153,
                11154,
                11155,
                11276,
                11277,
                11278,
                11431,
                11433,
                11508,
                11509,
                11510,
                11511,
                11512,
                11513,
                11514,
                11515,
                11522,
                11536,
                11550,
                11551,
                11552,
                11553,
                11554,
                11555,
                11556,
                11557,
                11558,
                11559,
                11560,
                11561,
                11562,
                11563,
                13768,
                11574,
                13779,
                13780,
                13782,
                12283,
                12248,
                12249,
                12251,
                12270,
                12271,
                12273,
                12274,
                12275,
                12276,
                12279,
                12278,
                12280,
                12281,
                12282,
                12292,
                12293,
                12313,
                12314,
                12315,
                12316,
                12317,
                12322,
                12323,
                12324,
                12326,
                12356,
                12597,
                12325,
                14112,
                13627,
                13631,
                13632,
                13634,
                13637,
                12277,
                14120,
                15545,
                15546,
                15547,
                15548,
                15762,
                15763,
                15772,
                15786,
                15787,
                15878,
                15881,
                15882,
                16220,
                16221,
                16222,
                16223,
                16224,
                16225,
                16226,
                16227,
                16228,
                13701,
                13703,
                13704,
                13707,
                13749,
                20678,
                20679,
                20680,
                20681,
                20682,
                20683,
                11432,
                13767,
                13769,
                31988]

for id in miscoded_ids
  property = Property.find(id)
  # normalize their street_address, update property_full_address
  byebug
  # geocode property_full_address

end
# properties = Property.pluck(:id, :display_name)

# properties.each do |property|
#   if property.not_in_jersey_city?
#     puts "Property #{property.id} is not in Jersey City"
#   end
# end

# miscoded_properties_ids = []
# properties.each do |property|
#   miscoded_properties_ids << property.first if !property.second.include?("Jersey City")
# end

# for id in miscoded_properties_ids
#   property = Property.find(id)
#   property.update(display_name: property.display_name.gsub("Jersey City", "New Jersey City"))
# end

# raw_csv_path = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/raw_csv/0906demo191023.csv")

# hackensack_deed_2022 = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/Hackensack/0223demo203904.csv")
# hackensack_2022 = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/Hackensack/0223demo203923.csv")

# csv = CSV.parse(hackensack_2022, headers: true, liberal_parsing: true)
# keep = ["Municipality", "Property Location", "Owner's Name", "Owner's Mailing Address", "City/State/Zip"]
# byebug

# muni = csv["Municipality"]

# properties = Property.all

# # update properties with municipal code
# properties.each do |property|
#   if property.municipal_code.nil?
#     if property.g_code.include?("Jersey City")
#       property.municipal_code = "0906"
#       puts "#{property.id} updated with municipal code 0906"
#     end
#   end
# end

# properties.each do |property|
#   if property.include?("Jersey City")
#     property.update!(municipal_code: "0906")
#     puts "#{property.id} updated with municipal code: #{property.municipal_code}"
#   end
# end

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

# unique_property_g_code = Property.pluck(:g_code).uniq

# unique_property_g_code.each do |g_code|
#   street_address = g_code.split(",")[0]
#   municipality = "Jersey City"
#   state = "New Jersey"
#   zipcode = g_code.split(",")[8].strip

#   property = Property.where(g_code: g_code)

#   new_address = Address.create(
#     street_address: street_address,
#     municipality: municipality,
#     state: state,
#     zipcode: zipcode,
#     # properties_id: property.pluck(:id)[0],
#   )

#   puts "Created #{new_address}!"

#   # Property.where(g_code: g_code).update(addresses_id: new_address.id)

#   # puts "Updated #{g_code}!"
# end

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

# puts "Created #{street_address} as an Address!"
# end
