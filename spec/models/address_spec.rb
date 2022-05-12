require "rails_helper"

RSpec.describe Address, type: :model do
  let(:address) { create(:address, street_address: "208 Anderson St", municipality: "Hackensack", state: "New Jersey", zipcode: "07601") }

  # it { is_expected.to belong_to(:property) }
  # it { is_expected.to have_many(:landlords).through(:properties) }
  describe "validations" do
    it "has a valid factory" do
      puts address.inspect
      expect(build(:address)).to be_valid
    end

    it "is invalid without a street_address" do
      address.street_address = nil
      expect(address).to_not be_valid
    end

    it "is invalid without a municipality" do
      address.municipality = nil
      expect(address).to_not be_valid
    end

    it "is invalid without a state" do
      address.state = nil
      expect(address).to_not be_valid
    end

    # it { is_expected.to validate_presence_of(:street_address) }
    # it { is_expected.to validate_presence_of(:municipality) }
    # it { is_expected.to validate_presence_of(:state) }
    # it { is_expected.to validate_presence_of(:zipcode) }
  end
  # it { is_expected.to validate_uniqueness_of(:full_address) }
  # it { is_expected.to validate_uniqueness_of(:latitude_and_longitude) }

end
