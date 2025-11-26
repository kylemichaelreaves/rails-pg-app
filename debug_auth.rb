#!/usr/bin/env ruby
# Comprehensive authentication debugging script

require_relative 'config/environment'

ConsoleLogger.section('Authentication System Debug', color: :magenta) do

  # 1. Check Middleware Stack
  ConsoleLogger.section('Middleware Stack', color: :cyan) do
    middleware = Rails.application.middleware.middlewares

    has_cookies = middleware.any? { |m| m.to_s.include?('ActionDispatch::Cookies') }
    has_session = middleware.any? { |m| m.to_s.include?('ActionDispatch::Session') }
    has_cors = middleware.any? { |m| m.to_s.include?('Rack::Cors') }

    ConsoleLogger.info("ActionDispatch::Cookies: #{has_cookies ? '✅' : '❌'}")
    ConsoleLogger.info("ActionDispatch::Session: #{has_session ? '✅' : '❌'}")
    ConsoleLogger.info("Rack::Cors: #{has_cors ? '✅' : '❌'}")

    ConsoleLogger.error('Missing middleware! Server needs restart.') if !has_cookies || !has_session
  end

  # 2. Check User Model
  ConsoleLogger.section('User Model', color: :cyan) do
    ConsoleLogger.info("User model defined: #{defined?(User) ? '✅' : '❌'}")
    ConsoleLogger.info("has_secure_password: #{User.instance_methods.include?(:authenticate) ? '✅' : '❌'}")
    ConsoleLogger.info("Users in database: #{User.count}")

    if User.count.positive?
      sample_user = User.first
      ConsoleLogger.info("Sample user: #{sample_user.email} (ID: #{sample_user.id})")
    end
  end

  # 3. Check Routes
  ConsoleLogger.section('Authentication Routes', color: :cyan) do
    routes = Rails.application.routes.routes.map(&:path).map(&:spec).map(&:to_s)

    auth_routes = {
      'POST /api/v1/register' => routes.any? { |r| r.include?('/api/v1/register') },
      'POST /api/v1/login' => routes.any? { |r| r.include?('/api/v1/login') },
      'DELETE /api/v1/logout' => routes.any? { |r| r.include?('/api/v1/logout') },
      'GET /api/v1/me' => routes.any? { |r| r.include?('/api/v1/me') }
    }

    auth_routes.each do |route, exists|
      ConsoleLogger.info("#{route}: #{exists ? '✅' : '❌'}")
    end
  end

  # 4. Check Controllers
  ConsoleLogger.section('Controllers', color: :cyan) do
    controllers = {
      'ApplicationController' => defined?(ApplicationController),
      'SessionsController' => defined?(Api::V1::SessionsController),
      'RegistrationsController' => defined?(Api::V1::RegistrationsController)
    }

    controllers.each do |name, exists|
      ConsoleLogger.info("#{name}: #{exists ? '✅' : '❌'}")
    end

    # Check ApplicationController includes
    if defined?(ApplicationController)
      includes = ApplicationController.included_modules.map(&:to_s)
      ConsoleLogger.info("\nApplicationController includes:")
      ConsoleLogger.info("  - ActionController::Cookies: #{includes.include?('ActionController::Cookies') ? '✅' : '❌'}")
      ConsoleLogger.info("  - ActionController::RequestForgeryProtection: #{includes.include?('ActionController::RequestForgeryProtection') ? '✅' : '❌'}")
    end
  end

  # 5. Test Session Functionality
  ConsoleLogger.section('Session Test', color: :cyan) do
    begin
      # Create a mock request
      app = Rails.application
      env = Rack::MockRequest.env_for('http://localhost:3000/')
      session = ActionDispatch::Request.new(env).session

      # Try to set a session value
      session[:test] = 'value'
      session_works = session[:test] == 'value'

      ConsoleLogger.info("Session functionality: #{session_works ? '✅' : '❌'}")
    rescue StandardError => e
      ConsoleLogger.error("Session test failed: #{e.message}")
    end
  end

  # 6. Test Registration Endpoint (simulated)
  ConsoleLogger.section('Endpoint Test', color: :cyan) do
    begin
      # Test if we can reach the registration controller
      controller = Api::V1::RegistrationsController.new
      ConsoleLogger.info('RegistrationsController instantiation: ✅')

      # Check if user_params method exists
      has_user_params = controller.respond_to?(:user_params, true)
      ConsoleLogger.info("user_params method exists: #{has_user_params ? '✅' : '❌'}")
    rescue StandardError => e
      ConsoleLogger.error("Controller test failed: #{e.message}")
    end
  end

  # 7. Environment Check
  ConsoleLogger.section('Environment', color: :cyan) do
    ConsoleLogger.info("Rails env: #{Rails.env}")
    ConsoleLogger.info("API only mode: #{Rails.application.config.api_only}")
    ConsoleLogger.info("BCrypt available: #{defined?(BCrypt) ? '✅' : '❌'}")
    ConsoleLogger.info("rack-cors gem loaded: #{defined?(Rack::Cors) ? '✅' : '❌'}")
  end

  # 8. Summary and Recommendations
  ConsoleLogger.section('Summary', color: :green) do
    issues = []

    # Check critical components
    middleware = Rails.application.middleware.middlewares
    has_cookies = middleware.any? { |m| m.to_s.include?('ActionDispatch::Cookies') }
    has_session = middleware.any? { |m| m.to_s.include?('ActionDispatch::Session') }

    issues << 'Middleware not loaded - RESTART SERVER REQUIRED' unless has_cookies && has_session

    issues << 'User model not properly configured' unless defined?(User) && User.respond_to?(:find_by)

    issues << 'SessionsController not found' unless defined?(Api::V1::SessionsController)

    if issues.empty?
      ConsoleLogger.success('All checks passed! ✅')
      ConsoleLogger.info("\nNext steps:")
      ConsoleLogger.info('1. Open browser to http://localhost:3000/')
      ConsoleLogger.info('2. Open DevTools Console (F12)')
      ConsoleLogger.info('3. Try to register/login')
      ConsoleLogger.info('4. Check Network tab for API calls')
      ConsoleLogger.info('5. Run: ruby test_api_registration.rb')
    else
      ConsoleLogger.error('Issues found:')
      issues.each { |issue| ConsoleLogger.error("  - #{issue}") }
    end
  end
end

puts "\n"
ConsoleLogger.info('To test the API directly, run:', color: :light_blue)
ConsoleLogger.info('  ruby test_api_registration.rb', color: :light_blue)

