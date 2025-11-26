# frozen_string_literal: true
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # Root path
  root 'homepage#index'

  namespace :api do
    namespace :v1 do

      post '/register', to: 'registrations#create'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/me', to: 'sessions#show'

      # Define search routes explicitly before resources
      get 'properties/search', to: 'properties#search'
      get 'landlords/search', to: 'landlords#search'

      resources :properties do
        resources :landlords
        resources :addresses
      end

      resources :landlords do
        resources :properties
      end

      resources :addresses

      resources :memos do
        collection do
          get :summary
        end
      end

      resources :transactions do
        collection do
          get :days
          get :weeks
          get :months
          get :years

          # frequency summary
          get ':frequency/summary',
              to: 'transactions#frequency_summary',
              as: :frequency_summary,
              constraints: { frequency: /daily?|weekly?|monthly?|yearly?/ }

          get ':timeframe/:date/summary',
              to: 'transactions#timeframe_summary',
              as: :timeframe_summary,
              constraints: { timeframe: /days?|weeks?|months?|years?/ }
        end
      end

    end
  end

  # Catch-all route for React SPA - must handle all frontend routes
  get '*path', to: 'homepage#index', constraints: lambda { |req|
    # Serve React app for browser requests, but not for API JSON requests
    req.format.html? && !req.path.start_with?('/rails/')
  }
end