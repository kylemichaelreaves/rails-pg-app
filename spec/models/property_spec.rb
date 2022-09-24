require "rails_helper"

RSpec.describe Property, type: :model do
  describe "validations" do
    subject { build(:property) }

    it { should initialize }

    it { should validate_presence_of(:municipal_code) }
    it { should validate_presence_of(:street_address) }
    it { should validate_presence_of(:owner_name) }
    it { should validate_presence_of(:city_state_zip) }
    it { should validate_presence_of(:owner_mailing_address) }

    it { should be_valid }

  end

  describe "get_municipality" do
    it "should return the municipality from a municipal code" do
      property = build(:property, municipal_code: "0906", street_address: "677 Liberty St", city_state_zip: "Jersey City, NJ, 07307", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
      expect(property.get_municipality).to eq("Jersey City")
    end

    it "should return the municipality from a different municipal code" do
      property = build(:property, municipal_code: "0223", street_address: "453 Main St", city_state_zip: "Hackensack, NJ, 07601", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
      expect(property.get_municipality).to eq("Hackensack")
    end

    #  when the municipal_code is Paterson, it should return Paterson
    it "should return the municipality from a different municipal code" do
      #163 Rosa Parks Blvd | Paterson, NJ, 07501
      property = build(:property, municipal_code: "1608", street_address: "163 Rosa Parks Blvd", city_state_zip: "Paterson, NJ, 07601", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
      expect(property.get_municipality).to eq("Paterson")
    end

  end
  #
  # describe "get_landlord" do
  #   it "should return the landlord from a name" do
  #   end
  # end
  #
  # describe "not_in_jersey_city?" do
  #   it "should return false if the property's display_name is in Jersey City" do
  #     property = build(:property, municipal_code: "0906", street_address: "677 Liberty St", city_state_zip: "Jersey City, NJ, 07307", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
  #     expect(property.not_in_jersey_city?).to eq(false)
  #   end
  #
  #   it "should return true if the property's display_name is not in Jersey City" do
  #     property = build(:property, municipal_code: "0223", street_address: "453 Main St", city_state_zip: "Hackensack, NJ, 07601", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
  #     expect(property.not_in_jersey_city?).to eq(true)
  #   end
  # end
  #
  # describe "get_address" do
  #   it "should return the address from an address_id when address_id is not nil" do
  #     property = build(:property, municipal_code: "0906", street_address: "677 Liberty St", city_state_zip: "Jersey City, NJ, 07307", owner_name: "Cynthia Drangus", owner_mailing_address: "677 Liberty St")
  #     expect(property.get_address).to eq(Address.find(property.address_id))
  #   end

  # describe "scopes" do
  #   describe "search_by_name" do
  #     let!(:property) { create(:property) }
  #     let!(:property2) { create(:property,
  #                               street_address: "400 Main St",
  #                               city_state_zip: "Hackensack, NJ, 07601",
  #                               owner_name: "Beverly Pringle",
  #                               owner_mailing_address: "300 Main Street") }

  #     let!(:property3) { create(:property,
  #                               street_address: "245 Main St",
  #                               city_state_zip: "Hackensack, NJ, 07601",
  #                               owner_name: "Henry Pringle-Drangus",
  #                               owner_mailing_address: "300 Main Street") }

  #     it "should return the property with the name" do
  #       expect(Property.search_by_name(property.owner_name)).to include([property])
  #     end

  #     it "should return the property with the name" do
  #       expect(Property.search_by_name("Beverly Pringle")).to include([property2])
  #     end

  #     it "should return the property with the name" do
  #       expect(Property.search_by_name("Henry Pringle-Drangus")).to include([property3])
  #     end
  #   end
end

# end
# end
