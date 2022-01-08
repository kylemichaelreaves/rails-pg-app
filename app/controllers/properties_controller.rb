class PropertiesController < ApplicationController
  def index
    # @properties = Property.all
    property = Property.all.order(created_at: :desc)
    render json: property
  end

  def create
    property = Property.create!(property_params)
    if property
      render json: property
    else
      render json: property.errors
    end
  end

  def show
    @property = Property.find(params[:id])
  end

  def destroy
  end

  private

  def property_params
    params.permit(:street_address, :owner_name, :owner_mailing_address, :city_state_zip, :property_full_address, :units_at_property, :g_code, :latitude, :longitude, :owner_full_mailing_address)
  end

end
