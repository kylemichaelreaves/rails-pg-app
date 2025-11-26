#!/usr/bin/env ruby
# Test authentication setup

require_relative 'config/ig/environment'

ConsoleLogger.section('Authentication Setup Test', color: :cyan) do
  # Check if User model is accessible
  ConsoleLogger.info("User model: #{defined?(User) ? '✓' : '✗'}")

  # Check if bcrypt is available
  ConsoleLogger.info("BCrypt: #{defined?(BCrypt) ? '✓' : '✗'}")

  # Check user count
  ConsoleLogger.info("Users in database: #{User.count}")

  # Try to create a test user
  begin
    test_user = User.find_or_create_by(email: 'test@example.com') do |u|
      u.password = 'password123'
      u.password_confirmation = 'password123'
      u.role = :regular
    end

    if test_user.persisted?
      ConsoleLogger.success("Test user created/found: test@example.com")
      ConsoleLogger.info("  User ID: #{test_user.id}")
      ConsoleLogger.info("  Role: #{test_user.role}")

      # Test authentication
      if test_user.authenticate('password123')
        ConsoleLogger.success("Password authentication works!")
      else
        ConsoleLogger.error("Password authentication failed!")
      end
    else
      ConsoleLogger.error("Failed to create user: #{test_user.errors.full_messages.join(', ')}")
    end
  rescue => e
    ConsoleLogger.error("Error: #{e.message}")
    ConsoleLogger.info(e.backtrace.first(5).join("\n"), color: :light_black)
  end
end

