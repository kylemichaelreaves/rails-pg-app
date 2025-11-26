# frozen_string_literal: true

# app/models/user.rb
class User < ApplicationRecord
  has_secure_password

  enum :role, { regular: 0, admin: 1 }, default: :regular

  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: {
              with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\z/
            }

  normalizes :email, with: ->(email) { email.strip.downcase }

  # Authorization helper methods
  def admin?
    role == 'admin'
  end

  def regular?
    role == 'regular'
  end
end