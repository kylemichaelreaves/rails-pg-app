module Api
  module V1
    class LandlordsController < ApplicationController
      before_action :set_landlord, only: %i[show edit update destroy]

      def index
        @landlords = if params[:search].present?
                       Landlord.search_by_name(params[:search])
                     elsif params[:name].present?
                       Landlord.search_by_name(params[:name])
                     else
                       Landlord.order(params[:sort])
                     end

        return unless @landlords.present?

        if @landlords.count < 50
          render json: @landlords
        elsif @landlords.count > 50
          render json: @landlords.then(&paginate)
        else
          render json: @landlords.errors
        end
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

    def edit; end

    def search
      @landlords = Landlord.search_by_name(params[:search]) if params[:search].present?
      render component: 'LandlordsList', props: { data: @landlords }
    end

    def create
      @landlord = Landlord.new(landlord_params)

      respond_to do |format|
        if @landlord.save
          format.html { redirect_to landlord_url(@landlord), notice: 'Landlord was successfully created.' }
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
          format.html { redirect_to landlord_url(@landlord), notice: 'Landlord was successfully updated.' }
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
        format.html { redirect_to landlord_url, notice: 'Landlord was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private

    def set_landlord
      @landlord = Landlord.find(params[:id])
    end

    def landlord
      @landlord ||= Landlord.find(params[:id])
    end

    def landlord_params
      params.require(:landlord).permit(:name, :mailing_address, :city_state_zip, :search)
    end
  end
end

