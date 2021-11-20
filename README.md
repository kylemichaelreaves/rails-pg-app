# README

## creating a Rails app for Postgres…with React…and TypeScript

- `rails new [application name] -d postgresql`
You could also set up react with a flag:
- `rails new [application name] -d postgresql --webpack=react`

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

## Created Models

```ruby
rails generate model ${model}
```

## Create db

```ruby
bin/rails db:create
```

## Make migrations
```ruby
rails generate migrations AddToProperty somethingsomething, somethingelse:integer, else_array:string, array:true
```

```ruby
bin/rails db:migrate
```

### Setting up React
`bundle exec rake webpacker:install`
`bundle exec rake webpacker:install:react`

### Adding TypeScript/Webpack support
```
bundle exec rails webpacker:install:typescript
```
```
yarn add @types/react @types/react-dom
```
