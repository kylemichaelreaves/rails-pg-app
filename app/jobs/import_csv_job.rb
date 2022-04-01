require 'csv'
require 'open-uri'
require 'geocoder'

class ImportCsvJob < ApplicationJob
  # queue_as :default

  # def perform(*args)

  #   # check if the file is a .csv
      # check if the filename contains 'demo'
      # if it does, slice the string and grab the numbers before 'demo'
      # put those numbers through the municipal_code method
      
  #   properties = []
  #   CSV.foreach(filename, headers: true) do |row|
  #     properties << row
  #   end

  #   Property.import(*properties)

  # end
end
