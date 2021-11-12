# README

## creating a Rails app for Postgres
- `rails new [application name] -d postgresql`

## Running this app locally requires some boilerplate:
- cd into the directory.

- `touch config/boot.rb`

- Inside of config/boot.rb, include the following:

```ruby
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
```

- `rails webpacker:install`
