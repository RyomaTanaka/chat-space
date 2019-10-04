Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  get 'users/edit'
  get 'users/update'
  resources :users, only: [:edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
