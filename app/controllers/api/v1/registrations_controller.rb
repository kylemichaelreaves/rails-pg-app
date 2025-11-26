# frozen_string_literal: true

module Api
  module V1
    # app/controllers/api/v1/registrations_controller.rb
    class RegistrationsController < ApplicationController

      def create
        user = User.new(user_params)

        if user.save
          session[:user_id] = user.id
          render json: { user: UserSerializer.new(user).as_json }, status: :created
        else
          render json: {
            errors: user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end