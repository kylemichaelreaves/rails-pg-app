class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Pagination

  # before_action :redirect_html_requests_to_frontend
  before_action :underscore_params!

  # def redirect_html_requests_to_frontend
  #   # If this is a GET HTML request to an API endpoint, redirect to frontend route
  #   # Don't redirect POST/PUT/DELETE requests as they're actual API calls
  #   if request.get? && request.format.html? && request.path.start_with?('/api/v1/')
  #     # Remove /api/v1 prefix to get the frontend route
  #     frontend_path = request.path.sub('/api/v1', '')
  #     frontend_path = '/' if frontend_path.empty?
  #     redirect_to frontend_path and return
  #   end
  # end

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end

  private

  # Authentication methods
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    current_user.present?
  end

  # Authorization methods (use as before_action filters)
  def require_authentication
    return if logged_in?

    render json: { error: 'Authentication required' }, status: :unauthorized

  end

  def require_admin
    return if current_user&.admin?

    render json: { error: 'Admin access required' }, status: :forbidden

  end
end