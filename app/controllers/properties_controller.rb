class PropertiesController < ApplicationController
  def index
    @property = Property.all
  end
end
