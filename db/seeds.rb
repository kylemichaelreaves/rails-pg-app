# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
require 'open-uri'

# raw_csv_path = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/raw_csv/0906demo191023.csv").
raw_csv_path = URI.open("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/raw_csv/0906demo191023.csv")

# def raw_csv_path
#    @raw_csv_path ||= File.read("https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/main/JerseyCity/raw_csv/0906demo191023.csv")
# end

# File.open(RAW_CSV_PATH).each do |line|
#    line = line.chomp
#    puts line
# end

# owners_name = CSV.readlines("/Users/kylereaves/Downloads/0906demo191023.csv", headers:true).map{|row| row.values_at("Owner's Name") }
# puts owners_name
# col_data = []
# CSV.foreach(RAW_CSV_PATH) { |row| col_data << row["Owner's Name"] }
# puts col_data

csv = CSV.parse(raw_csv_path, headers: true, liberal_parsing: true)
owners_names = csv["Owner's Name"]
property_location = csv["Property Location"]
city_state_zip = csv['City/State/Zip']
city_state_array = []
city_state = city_state_zip.each { |n| city_state_array << n.split(/\s\s/)[0] }
zip_array = []
zip = city_state_zip.each { |n| zip_array << n.split(/\s\s/)[-1] }

for name in owners_names
   byebug
   puts name if name.include?('&')
end

# p owners_names

# CSV.foreach("/Users/kylereaves/src/landlord_data/JerseyCity/jersey_city_private_property.csv", :headers => true) do |row|
#    Property.create!(row.to_hash)
# end
