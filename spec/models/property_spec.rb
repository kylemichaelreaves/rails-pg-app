require "rails_helper"

RSpec.describe Property, type: :model do
  describe "validations" do
    subject { build(:property) }

    it { should initialize }

    it { should validate_presence_of(:street_address) }
    it { should validate_presence_of(:owner_name) }
    it { should validate_presence_of(:city_state_zip) }
    it { should validate_presence_of(:owner_mailing_address) }

    it { should have_and_belong_to_many(:landlords) }
    it { should have_one(:address) }
  end

  describe "scopes" do
    describe "search_by_name" do
      let!(:property) { create(:property) }
      let!(:property2) { create(:property, street_address: "400 Main St", owner_name: "Beverly Pringle", owner_mailing_address: "300 Main Street") }
      let!(:property3) { create(:property, street_address: "245 Main St", owner_name: "Henry Pringle-Drangus", owner_mailing_address: "200 Main St") }

      it "should return the property with the name" do
        expect(Property.search_by_name(property.owner_name)).to include([property])
      end

      it "should return the property with the name" do
        expect(Property.search_by_name("Beverly Pringle")).to eq([property2])
      end

      it "should return the property with the name" do
        expect(Property.search_by_name("Henry Pringle-Drangus")).to eq([property3])
      end
    end

    # describe "lives_outside_of_the_US" do
    #   let!(:property) { create(:property) }
    #   let!(:property2) { create(:property) }
    #   let!(:property3) { create(:property) }

    #   it "should return the property with the name" do
    #     expect(Property.lives_outside_of_the_US).to eq([property2, property3])
    #   end
    # end

    #   describe "owns_multiple_properties" do
    #     let!(:property) { create(:property) }
    #     let!(:property2) { create(:property) }
    #     let!(:property3) { create(:property) }

    #     it "should return the property with the name" do
    #       expect(Property.owns_multiple_properties).to eq([property2])
    #     end
    #   end
  end
end
