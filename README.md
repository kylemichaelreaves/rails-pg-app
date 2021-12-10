# README

Backend: Rails, Frontend: React, TypeScript, Database: Postgres

## creating a Rails with Postgres, React, and TypeScript

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

## Create node-versions and ruby-versions
…in the project folder create two files:
    `touch .node-version` with `16.13.1`
    `touch .ruby-version` with `3.0.2`


## Create Models
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

### Setting up React with TypeScript
`bundle exec rake webpacker:install`
`bundle exec rake webpacker:install:react`
`bundle exec rake webpacker:install:typescript`

### Adding TypeScript/Webpack support
```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-preact @types/webpack-env eslint-plugin-react -D
```
```
yarn add babel-plugin-transform-react-jsx
```
```
yarn add @types/react @types/react-dom
```

### MVC / ResponseRequest Cycle
- generate a model, or two
- generate a controller for one or more of the models
- update the route in `config/routes.rb`
- update the controller with new actions
