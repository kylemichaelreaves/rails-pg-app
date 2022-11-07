json.extract! address, :id, :street_address, :municipality, :state, :zipcode, :created_at, :updated_at
json.url address_url(address, format: :json)
