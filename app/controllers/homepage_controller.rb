class HomepageController < ActionController::Base
  # This controller needs to render HTML with layouts, not API responses
  layout 'application'

  def index
    # Renders app/views/homepage/index.html.erb with layout
  end
end
