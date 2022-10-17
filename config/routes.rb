# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :properties do
        resources :landlords
        resources :addresses

        collection do
          get 'search' => 'properties#search'
        end
      end

      resources :landlords do
        resource :properties
        resources :addresses

        collection do
          get 'search' => 'landlords#search'
        end
      end

      resources :addresses do
        resource :landlords
        resource :properties
      end
    end
  end

  # catch all route
  get '/*path' => 'homepage#index'
  get 'homepage/index', to: 'homepage#index'

  root 'homepage#index'
end
