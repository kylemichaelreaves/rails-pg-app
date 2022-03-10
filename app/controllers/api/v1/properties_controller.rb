class Api::V1::PropertiesController < ApplicationController
    def index
      @properties = Property.order(params[:sort])
      render json: @properties
    end

    def create
      @property = Property.create!(property_params)
      
      if property
        render json: @property
      else
        render json: @property.errors
      end
    end

    def show
      @property = Property.find(params[:id])
      if @property
        render json: @property
      else
        render json: @property.errors
      end
    end

    def update
      if @property.update(property_params)
        render json: :show, status: :ok, location: @property
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end


    # def destroy
    # end

    private

    def set_property
      @property = Property.find(params[:id])
    end

    def property_params
      params.permit(:street_address,
                    :owner_name,
                    :owner_mailing_address,
                    :city_state_zip,
                    :property_full_address,
                    :units_at_property,
                    :g_code,
                    :latitude,
                    :longitude,
                    :owner_full_mailing_address)
    end

    def property
      @property ||= Property.find(params[:id])
    end

  end
