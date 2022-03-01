# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :properties, :landlords

      get 'properties/index', to: 'properties#index'
      get 'properties/:id', to: 'properties#show'
      post 'properties/create'
      delete 'properties/destroy'
      get 'landlords/index', to: 'landlords#index'
      get 'landlords/:id', to: 'landlords#show'
      post 'landlords/create'
      delete 'landlords/destroy'
    end
  end

  # catch all route
  get '/*path' => 'homepage#index'
  get 'homepage/index', to: "homepage#index"

  root 'homepage#index'
end
