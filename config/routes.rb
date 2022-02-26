# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :properties, :landlords
      
      get 'properties/index', to: 'properties#index'
      post 'properties/create'
      get 'properties/show/:id', to: 'properties#show'
      delete 'properties/destroy'
      get 'landlords/index', to: 'landlords#index'
      post 'landlords/create'
      get 'landlords/show', to: 'landlords#show'
      delete 'landlords/destroy'
    end
  end

  # get '/properties', to: 'properties#index'
  # get '/properties/:id', to: 'properties#show'

  # get '/landlords', to: 'landlords#index'
  # get '/landlords/:id', to: 'landlords#show'


  # catch all route
  get '/*path' => 'homepage#index'
  get 'homepage/index', to: "homepage#index"

  root 'homepage#index'
end