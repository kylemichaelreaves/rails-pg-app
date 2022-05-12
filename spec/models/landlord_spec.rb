require "rails_helper"

RSpec.describe Landlord, type: :model do
  let(:landlord) { create(:landlord, name: "Cynthia Drangus", mailing_address: "208 Anderson St", city_state_zip: "Hackensack, NJ") }

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }

    it "has a valid factory" do
      expect(build(:landlord)).to be_valid
    end

    it "is invalid without a name" do
      landlord.name = nil
      expect(landlord).to_not be_valid
    end
  end
end
