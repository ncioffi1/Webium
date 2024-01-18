Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    # define routes here to include them in the api namespace
    resource :session, only: [:create, :show, :destroy]
    resources :users, only: [:create, :show]
    resources :articles, only: [:create, :show, :index, :update, :destroy]
  end


  get '*path', to: "static_pages#frontend_index"
end
