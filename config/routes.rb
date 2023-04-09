Rails.application.routes.draw do
  devise_for :users
  get 'games/top'
  get 'games/play'
  get 'games/result'
  root 'games#top'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
