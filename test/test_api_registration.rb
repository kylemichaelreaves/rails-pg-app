#!/usr/bin/env ruby
# Test API registration endpoint

require 'net/http'
require 'json'
require 'uri'

API_URL = 'http://127.0.0.1:3000'

def test_registration
  uri = URI("#{API_URL}/api/v1/register")

  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'

  # Send registration data
  test_email = "test_#{Time.now.to_i}@example.com"
  request.body = {
    user: {
      email: test_email,
      password: 'password123',
      password_confirmation: 'password123'
    }
  }.to_json

  puts "=" * 60
  puts "Testing Registration Endpoint"
  puts "=" * 60
  puts "Email: #{test_email}"
  puts "Sending request to: #{uri}"
  puts ""

  response = http.request(request)

  puts "Status: #{response.code} #{response.message}"
  puts "Headers:"
  response.each_header do |key, value|
    puts "  #{key}: #{value}" if key.start_with?('set-cookie')
  end
  puts ""
  puts "Body:"

  begin
    body = JSON.parse(response.body)
    puts JSON.pretty_generate(body)
  rescue JSON::ParserError
    puts response.body
  end

  puts "=" * 60

  if response.code == '201'
    puts "✅ Registration successful!"
  else
    puts "❌ Registration failed!"
  end
end

# Check if server is running
begin
  uri = URI("#{API_URL}/")
  Net::HTTP.get_response(uri)
  test_registration
rescue Errno::ECONNREFUSED
  puts "❌ Error: Rails server is not running on #{API_URL}"
  puts "Start the server with: bin/dev or rails s"
end

