# README

Frontend: React and TypeScript;
Backend: Rails;
Database: Postgres;

This app uses data I cleaned from my [landlord_project](https://github.com/kylemichaelreaves/landlord_data).

I am building essentially the same app, but in Python/Django, to get a sense for the strengths and limitations of both.

That project can be found at [django-pg-app](https://github.com/kylemichaelreaves/django-pg-app).

### Create a Rails with Postgres, React, and TypeScript:

```
rails new [application name] -d postgresql --webpack=react
```

#### cd inside the Rails app:

#### adding TypeScript via webpacker

```
bundle exec rake webpacker:install:typescript
```

### Running this app locally requires some boilerplate:

- cd into the directory.
- `touch config/boot.rb`
- Inside of config/boot.rb, include the following:

```ruby
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
```

### Create .node-versions and .ruby-versions:

In the project folder create two files:
`touch .node-version` with `16.13.1`
`touch .ruby-version` with `3.1.0`
This is necessary in order to get the app to run locally.

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

### Add rails-react gem, to pass Rails objects as props to React components

In the gemfile, add: `gem react-rails`

Then: `bundle install`

### Seeding database

Use the csv module to iterate over the csv and create records:

```ruby
require 'csv'
    CSV.foreach("#{CSV_PATH}/jersey_city_private_property.csv", :headers => true) do |row|
      Property.create!(row.to_hash)
    end
```
### Updating to the latest Rails version
```
bundle update
```
## Querying with ActiveRecord

#### Finding landlords with the most property\
In the app's rails console…(`bin/rails console`)…
- Return the number of records with `Property.count`
  ```ruby
  irb(main):017:0> Property.count
  Property Count (15.4ms)  SELECT COUNT(*) FROM "properties"
  => 42030
  ```
- Return the number of times a landlords appeared in properties: with `Property.distinct(:owner_name).count`
  ```ruby
  irb(main):021:0> Property.distinct.count(:owner_name)
  Property Count (592.1ms)  SELECT COUNT(DISTINCT "properties"."owner_name") FROM "properties"
  => 37494
  ```
- Return an array of unique names
  ```ruby
  Property.distinct(:owner_name).pluck(:owner_name)
  ```
- Return a sorted array of arrays; the second value in the nested arrays is the value count of name in the properties table
  ```ruby
  Property.pluck(:owner_name).tally.sort_by { |k, v|v }
  ```
- Return malformed (strings including more than two spaces) owner_name

- ```ruby
  irb(main):136:1* Property.distinct.pluck(:owner_name).each_with_index do |el, i|
  irb(main):137:0>   puts el, i if el.match?(/\s+{2}/) end;nil
  ```

- ```ruby
  Property.distinct.pluck(:owner_name).each_with_index { |el, i| puts el, i if el.match?(/\s+{2}/) }.to_h;nil
  ```

- Returning the id's of the properties associated with a given owner, in this case, the name which appears the most (617) in the `properties` table: `COA 99 HUDSON,LLC`
```ruby
    Property.where(owner_name: "COA 99 HUDSON,LLC").pluck(:id)
```
