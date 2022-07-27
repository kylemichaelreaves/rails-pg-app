require "rails_helper"

RSpec.describe Landlord, type: :model do
  describe "validations" do
    subject { build(:landlord) }

    it "has a valid factory" do
      expect(subject).to be_valid
    end

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:mailing_address) }
    it { should validate_presence_of(:city_state_zip) }
  end

  describe "#get_property_ids" do
    it "gets the property_ids of a landlord with a single property" do
      expect(subject.get_property_ids).must_be(1)
    end
  end

end
