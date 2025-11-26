module Pagination
  extend ActiveSupport::Concern

  def default_per_page
    50
  end

  def page_no
    params[:page]&.to_i || 1
  end

  def per_page
    params[:per_page]&.to_i || default_per_page
  end

  def paginate_offset
    (page_no - 1) * per_page
  end

  def paginate
    lambda do |scope|
      return scope unless scope.present?

      # Support both pagination styles
      if params[:limit].present? || params[:offset].present?
        # Direct limit/offset style
        scope = scope.limit(params[:limit].to_i) if params[:limit].present? && params[:limit].to_i.positive?
        scope = scope.offset(params[:offset].to_i) if params[:offset].present? && params[:offset].to_i >= 0
        scope
      else
        # Page-based style
        scope.limit(per_page).offset(paginate_offset)
      end
    end
  end
end