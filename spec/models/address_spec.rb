require "rails_helper"

RSpec.describe Address, type: :model do
  subject { build(:address) }

  describe "validations" do
    it "builds with a valid factory" do
      expect(subject).to be_valid
    end

    it { should validate_presence_of(:street_address) }
    it { should validate_presence_of(:municipality) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:zipcode) }
  end
end
