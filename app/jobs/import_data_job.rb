require 'csv'
require 'open-uri'
require 'geocoder'

class ImportDataJob < ApplicationJob
  # queue_as :default

  # def perform(*args)
  #   # Do something later
  #   # so we're dealing with taking a municipality and turning them into records
  #   properties = []
  #   CSV.foreach(filename, headers: true) do |row|
  #     properties << row
  #   end

  #   Property.import(*properties)

  # end
end
