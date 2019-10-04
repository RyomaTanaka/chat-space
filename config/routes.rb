Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :users, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:create, :index]
  end
end
