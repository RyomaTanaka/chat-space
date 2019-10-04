Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  get 'users/edit'
  get 'users/update'
  resources :users, only: [:edit, :update]
end
