# README

This app uses data from my [landlord_project](https://github.com/kylemichaelreaves/landlord_data).

It's a Rails API with a React frontend.
~~I've switched to compiling with `eslint` and `webpack` from `webpacker` since it has been retired.
I followed [this](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md) tutorial for making
that switch.~~
Since, bundling (webpack) is no longer necessary now that native ES modules are supported in current browsers, I've
migrated to compiling with Vite and its integration with Rails, Vite-Ruby.

For general inspiration and guidance, I referenced to
this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend)
. However, in order to work with the latest libraries, there were some necessary modifications:

- ~~react-router uses new syntax in v6. Moreover, in `Step 5 — Configuring React as Your Rails Frontend`, sending props
  in App.jsx to the routes/Index didn't work. I
  referenced [this tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial) specifically for version
  6.~~
- React-Router 6.4 introduces new Route objects. I've remade the Route object according to react-router's latest
  documentation.
- ~~Inside of `application.html.erb` I placed a div referencing the root on the DOM, and beneath that a
  javascript_include_tag pointing toward the Index. In order to get the Bootstrap style to load I placed
  a `stylesheet_tag` beneath the generic Rails one.~~  Vite's tags replaces these.
- I'm using [react-query](https://react-query.tanstack.com/) and axios to call the API data. With
  TypeScript, [prop and return types needed to be specified for useQuery](https://tkdodo.eu/blog/react-query-and-type-script)
  in order for the component to work.

This is roughly the order I followed when creating the app:

0. Create a Rails with Postgres, React, and TypeScript:

```
rails new [application name] -d postgresql --webpack=react
```

1. `cd` into the Rails app

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

### Updating to the latest Rails version:

```
bundle update
```

### starting the dev server – both Rails and React:

```
bin/dev
```

## dumping the database

```
pg_dump rails_pg_app_development > db.sql
```

## loading the dumped db

```
cat db.sql | psql -d rails_pg_app_development
```

## Querying with ActiveRecord

##### Start Rails console:

```
bin/rails console
```

- Return the number of records with `Property.count`

```shell
  irb(main):017:0> Property.count
  Property Count (15.4ms)  SELECT COUNT(*) FROM "properties"
  => 42030
 ```

- Return the number of times a landlords appeared in properties: with `Property.distinct(:owner_name).count`

```shell
  irb(main):021:0> Property.distinct.count(:owner_name)
  Property Count (592.1ms)  SELECT COUNT(DISTINCT "properties"."owner_name") FROM "properties"
  => 37494
 ```

- Return an array of unique names

```ruby
Property.distinct(:owner_name).pluck(:owner_name)
```

- Return an array sorted by its nested second value; the second value is the count of `owner_name` in the properties
  table

```ruby
Property.pluck(:owner_name).tally.sort_by { |k, v| v }
```

- Return distinct full (concatenated) addresses

```ruby
Property.distinct.pluck(:property_full_address).count
```

- Return malformed `owner_name` (strings including more than two spaces)

```ruby
Property.distinct.pluck(:owner_name).each_with_index { |el, i| puts el, i if el.match?(/\s+{2}/) }
 ```

- Return the id's of properties of a given owner

```ruby
Property.where(owner_name: "COA 99 HUDSON,LLC").pluck(:id)
 ```

- Return records of Properties where Jersey City isn't in the g_code

```ruby
Property.pluck(:g_code).uniq.select { |el| puts el if !"Jersey City".in? el }
```


