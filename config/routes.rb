# frozen_string_literal: true

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :properties do
        resources :landlords
        resources :addresses

      end

      resources :landlords do
        resources :properties

        get 'search/:name', to: 'landlords#search', on: :collection

      end

      resources :addresses

    end
  end

  # catch all route
  get '*path', to: 'homepage#index', via: :all

  get 'homepage/index', to: 'homepage#index'

  root 'homepage#index'
end
