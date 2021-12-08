Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'properties#index'

  get '/properties' => 'properties#index'
  get '/properties/:id', to: 'properties#show'

  get '/landlords' => 'landlords#index'
  get '/landlords/:id', to: 'landlords#show'
end
