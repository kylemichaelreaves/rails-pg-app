class Api::V1::LandlordsController < ApplicationController
  def index
    @landlords = Landlord.all
    render json: landlords
  end

  def show
    if @landlord
      render json: @landlord
    else
      render json: @landlord.errors
    end
  end

  private

  def landlord
    @landlord ||= Landlord.find(params[:id])
  end
end
