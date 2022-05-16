require "rails_helper"

RSpec.describe Property, type: :model do
  describe "validations" do
    subject { build(:property) }
    # it "builds with a valid factory" do
    #   expect(subject).to be_valid
    # end
    it { is_excpected.to exist }

    it { should have_many(:landlords) }
    it { should has_one(:addresses) }
  end
end
