class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  include Pagination

  protect_from_forgery with: :null_session

  before_action :underscore_params!

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end