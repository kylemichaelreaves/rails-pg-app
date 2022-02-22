# README

Frontend: React 17.0.2 and TypeScript 4.5.5;
  React librariess:
    react-router: 6
    react-bootstrap...
    react-table...
Backend: Rails 7.0.2.2;
Webpack: 5.69.1;
Database: Postgres;

This app uses data from my [landlord_project](https://github.com/kylemichaelreaves/landlord_data).
It's essentially a Rails API with a React frontend, although I didn't build it as such at first.
It was built as Rails v6, and therefore with webpacker.
But I've since removed webpacker, since it's been retired, and switched to compiling with eslint and webpack.
I followed [this](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md) tutorial for making that switch.

I looked to this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend) as a guide for development.
However, there were some necessary modifications.
  - Step 5: react-router uses new syntax in v6. Moreover, sending props in the (unamed) App to the routes/Index prevented my React components from rendering.
  - Inside of `application.html.erb` I placed a div referencing the root on the DOM, and beneath that a javascript_include_tag pointing toward the Index.


0. Create a Rails with Postgres, React, and TypeScript:
```
rails new [application name] -d postgresql --webpack=react
```
1. cd inside the Rails app:
2. Running this app locally requires some boilerplate:

- cd into the directory.
- `touch config/boot.rb`
- Inside of config/boot.rb, include the following:

```ruby
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
```

3. Create .node-versions and .ruby-versions:

4. In the project folder create two files:
`touch .node-version` with `16.14.1`
`touch .ruby-version` with `3.1.0`
This is necessary in order to get the app to run locally.

5. Adding TypeScript/Webpack support

```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-preact @types/webpack-env eslint-plugin-react -D
```

```
yarn add babel-plugin-transform-react-jsx
```

```
yarn add @types/react @types/react-dom
```

6. Add rails-react gem, to pass Rails objects as props to React components

In the gemfile, add: `gem react-rails`

Then: `bundle install`

7. Seeding database

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

### starting dev server – both Rails and React
```
bin/dev
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
  ```ruby
  Property.distinct.pluck(:owner_name).each_with_index { |el, i| puts el, i if el.match?(/\s+{2}/) }
  ```

- Returning the id's of the properties associated with a given owner, in this case, the name which appears the most (617) in the `properties` table: `COA 99 HUDSON,LLC`
  ```ruby
  Property.where(owner_name: "COA 99 HUDSON,LLC").pluck(:id)
  ```
