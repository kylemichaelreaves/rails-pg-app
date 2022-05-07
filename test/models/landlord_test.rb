require 'test_helper'
require 'rails_helper'
require 'spec_helper'

class LandlordTest < ActiveSupport::TestCase
  RSpec.describe Landlord, type: :model do
    it "must have a name" do
      landlord = Landlord.new
      landlord.valid?
      assert_includes landlord.errors.keys, :name
    end

    it "should have a name" do
      landlord = Landlord.new
      landlord.name = nil
      landlord.valid?
      assert_equal(landlord.errors.messages[:name].first, "can't be blank")
    end

    it "should have a unique name" do
      landlord = Landlord.new
      landlord.name = "John Smith"
      landlord.save
      landlord2 = Landlord.new
      landlord2.name = "John Smith"
      landlord2.valid?
      assert_equal(landlord2.errors.messages[:name].first, "has already been taken")
    end

    it "should have a name that is not blank" do
      landlord = Landlord.new
      landlord.name = ""
      landlord.valid?
      assert_equal(landlord.errors.messages[:name].first, "can't be blank")
    end

    it "should have a name that is not only spaces" do
      landlord = Landlord.new
      landlord.name = "   "
      landlord.valid?
      assert_equal(landlord.errors.messages[:name].first, "can't be blank")
    end

    it "should have a name that is not only numbers" do
      landlord = Landlord.new
      landlord.name = "12345"
      landlord.valid?
      assert_equal(landlord.errors.messages[:name].first, "can't be blank")
    end
  end
end