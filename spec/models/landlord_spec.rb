require "rails_helper"

RSpec.describe Landlord, type: :model do
  describe "validations" do
    subject { build(:landlord) }

    it { should initialize }

    it { should be_valid }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:mailing_address) }
    it { should validate_presence_of(:city_state_zip) }
  end

  describe "#get_property_ids" do
  end

  describe "#ensure_landlords_id" do
  end
end
