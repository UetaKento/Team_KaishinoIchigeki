Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'games/top'
  get 'games/play'
  get 'games/result'
  root 'games#top'
  resources :users, only: [:show]
end
