require "rails_helper"

RSpec.describe Landlord, type: :model do
  subject { build(:landlord) }

  describe "validations" do
    it "builds with a valid factory" do
      expect(subject).to be_valid
    end

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:full_mailing_address) }
    it { should validate_presence_of(:city_state_zip) }
  end
end
