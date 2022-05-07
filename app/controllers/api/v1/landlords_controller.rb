class Api::V1::LandlordsController < ApplicationController
  before_action :set_landlord, only: %i[ :show, :edit, :update, :destroy ]

  def index
    @landlords = Landlord.all
    render json: @landlords

    if params[:search]
      @landlords = Landlord.search(params[:search])
    end

  end

  def show
    if @landlord
      render json: @landlord
    else
      render json: @landlord.errors
    end
  end

  def new
    @landlord = Landlord.new
  end

  def edit
  end

  def create
    @landlord = Landlord.new(landlord_params)

    respond_to do |format|
      if @landlord.save
        format.html { redirect_to landlord_url(@landlord), notice: "Landlord was successfully created." }
        format.json { render :show, status: :created, location: @landlord }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @landlord.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @landlord.update(landlord_params)
        format.html { redirect_to landlord_url(@landlord), notice: "Landlord was successfully updated." }
        format.json { render :show, status: :ok, location: @landlord }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @landlord.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @landlord.destroy

    respond_to do |format|
      format.html { redirect_to landlords_url, notice: "Landlord was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def landlord
    @landlord ||= Landlord.find(params[:id])
  end

  def landlord_params
    params.require(:landlord).permit(:name, :mailing_address, :city_state_zip)
  end
end
