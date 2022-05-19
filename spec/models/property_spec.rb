require "rails_helper"

RSpec.describe Property, type: :model do
  describe "validations" do
    subject { build(:property) }
    # it "builds with a valid factory" do
    #   expect(subject).to be_valid
    # end
    it { should initialize }

    # it { is_expected.to exist }
    # it { should exist }

    it { should validate_presence_of(:street_address)}
    it { should validate_presence_of(:owner_name)}
    it { should validate_presence_of(:city_state_zip)}
    it { should validate_presence_of(:owner_mailing_address)}

    it { should have_and_belong_to_many(:landlords) }
    it { should have_one(:address) }
  end
end
