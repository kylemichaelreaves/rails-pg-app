require "rails_helper"

RSpec.describe Property, type: :model do
  subject { build(:property) }

  describe "validations" do
    it "builds with a valid factory" do
      expect(subject).to be_valid
    end
  end
end
