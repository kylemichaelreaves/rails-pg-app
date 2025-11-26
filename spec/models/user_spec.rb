require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should have_secure_password }

    context 'email format validation' do
      it 'accepts valid email addresses' do
        valid_emails = %w[user@example.com user.name@example.com user+tag@example.co.uk user_name@example.org]

        valid_emails.each do |email|
          user = build(:user, email: email)
          expect(user).to be_valid, "#{email} should be valid"
        end
      end

      it 'rejects invalid email addresses' do
        invalid_emails = [
          'user@',
          '@example.com',
          'user',
          'user@.com',
          'user@example',
          'user @example.com'
        ]

        invalid_emails.each do |email|
          user = build(:user, email: email)
          expect(user).not_to be_valid, "#{email} should be invalid"
          expect(user.errors[:email]).to be_present
        end
      end
    end
  end

  describe 'email normalization' do
    it 'strips whitespace from email' do
      user = create(:user, email: '  user@example.com  ')
      expect(user.email).to eq('user@example.com')
    end

    it 'converts email to lowercase' do
      user = create(:user, email: 'User@Example.COM')
      expect(user.email).to eq('user@example.com')
    end

    it 'normalizes email before uniqueness check' do
      create(:user, email: 'user@example.com')
      duplicate_user = build(:user, email: 'USER@EXAMPLE.COM')

      expect(duplicate_user).not_to be_valid
      expect(duplicate_user.errors[:email]).to include('has already been taken')
    end
  end

  describe 'role enum' do
    it 'has a regular role by default' do
      user = create(:user)
      expect(user.role).to eq('regular')
      expect(user.regular?).to be true
      expect(user.admin?).to be false
    end

    it 'can be created as an admin' do
      user = create(:user, :admin)
      expect(user.role).to eq('admin')
      expect(user.admin?).to be true
      expect(user.regular?).to be false
    end

    it 'can change roles' do
      user = create(:user, :regular)
      expect(user.regular?).to be true

      user.update(role: :admin)
      expect(user.admin?).to be true
      expect(user.regular?).to be false
    end
  end

  describe '#admin?' do
    context 'when user is an admin' do
      let(:user) { create(:user, :admin) }

      it 'returns true' do
        expect(user.admin?).to be true
      end
    end

    context 'when user is not an admin' do
      let(:user) { create(:user, :regular) }

      it 'returns false' do
        expect(user.admin?).to be false
      end
    end
  end

  describe '#regular?' do
    context 'when user is a regular user' do
      let(:user) { create(:user, :regular) }

      it 'returns true' do
        expect(user.regular?).to be true
      end
    end

    context 'when user is not a regular user' do
      let(:user) { create(:user, :admin) }

      it 'returns false' do
        expect(user.regular?).to be false
      end
    end
  end

  describe 'password authentication' do
    let(:user) { create(:user, password: 'secure_password123') }

    it 'authenticates with correct password' do
      expect(user.authenticate('secure_password123')).to eq(user)
    end

    it 'does not authenticate with incorrect password' do
      expect(user.authenticate('wrong_password')).to be false
    end

    it 'requires a password on creation' do
      user = build(:user, password: nil)
      expect(user).not_to be_valid
    end
  end
end
