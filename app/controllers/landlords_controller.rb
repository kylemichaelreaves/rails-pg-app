class LandlordsController < ApplicationController
    def index
      @landlords = Landlord.all
    end

    def show
        @landlord = Landlord.find(params[:id])
    end
end
