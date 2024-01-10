Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    # define routes here to include them in the api namespace
    resource :session, only: [:create, :new, :destroy]
    resources :users, only: [:new, :create, :edit, :update, :show]
    resources :articles, only: [:new, :create, :edit, :update, :destroy, :show]
  end
end
