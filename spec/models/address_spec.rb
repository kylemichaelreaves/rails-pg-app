require "rails_helper"

RSpec.describe Address, type: :model do
  describe "validations" do
    subject { build(:address) }

    it { should validate_presence_of(:street_address) }
    it { should validate_presence_of(:municipality) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:zipcode) }
  end
end
