class Api::V1::PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show edit update destroy ]

  def index
    @properties = Property.order(params[:sort])
    render json: @properties.then(&paginate)
  end

  def create
    @property = Property.create!(property_params)

    if property
      render json: @property
    else
      render json: @property.errors
    end
  end

  def new
    @property = Property.new
  end

  def show
    @property = Property.find(params[:id])
    if @property
      render json: @property
    else
      render json: @property.errors
    end
  end

  def create
    @property = Property.create!(property_params)

    respond_to do |format|
      if @property.save
        format.html { redirect_to property_url(@property), notice: "Property was successfully created." }
        format.json { render :show, status: :created, location: @property }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @property.update(property_params)
        format.html { redirect_to property_url(@property), notice: "Property was successfully updated." }
        format.json { render :show, status: :ok, location: @property }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @property.destroy

    respond_to do |format|
      format.html { redirect_to properties_url, notice: "Property was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_property
    @property = Property.find(params[:id])
  end

  def property_params
    params.permit(:street_address,
                  :owner_name,
                  :owner_mailing_address,
                  :city_state_zip)

    # none of these parameters are necessary,
    # they can all be derived from methods in the model…

    # :property_full_address,
    # :units_at_property,
    # :g_code,
    # :latitude,
    # :longitude,
    # :owner_full_mailing_address

  end

  def property
    @property ||= Property.find(params[:id])
  end
end
