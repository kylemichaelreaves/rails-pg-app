# frozen_string_literal: true

module Api
  module V1
    # app/controllers/api/v1/sessions_controller.rb
    class SessionsController < ApplicationController

      def create
        user = User.find_by(email: params[:email]&.downcase)

        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: {
            user: UserSerializer.new(user).as_json
          }, status: :created
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        session.delete(:user_id)
        head :no_content
      end

      def show
        if current_user
          render json: { user: UserSerializer.new(current_user).as_json }
        else
          head :unauthorized
        end
      end
    end
  end
end