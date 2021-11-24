# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"

Rails.application.load_tasks


require 'csv'
namespace :db do
  task :import_csv => :environment do
    CSV.foreach("/Users/kylereaves/src/landlord_data/JerseyCity/jersey_city_private_property.csv", :headers => true) do |row|
      Property.create!(row.to_hash)
    end
  end
end
