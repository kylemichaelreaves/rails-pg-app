source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.4.2'

# Core Rails
gem 'jbuilder'
gem 'pg'
gem 'puma'
gem 'rails', '~> 8.1.0'

# Authentication
gem 'bcrypt', '~> 3.1.7'

# Background Jobs
gem 'redis', '>= 4.0.1'
gem 'sidekiq'

# Assets & Frontend
gem 'propshaft' # for serving static assets
gem 'vite_rails' # main asset pipeline

# Features
gem 'bootsnap', require: false
gem 'geocoder'
gem 'rack-cors'
gem 'rgeo-geojson'

# AWS
gem 'aws-sdk-apigatewayv2'
gem 'aws-sdk-lambda'
gem 'aws-sdk-rds'
gem 'aws-sdk-s3'

group :development, :test do
  gem 'brakeman', require: false
  gem 'debug', platforms: %i[mri mingw x64_mingw windows]
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rspec-rails'
  gem 'rubocop-rails-omakase', require: false
end

group :development do
  gem 'rack-mini-profiler'
  gem 'web-console'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
