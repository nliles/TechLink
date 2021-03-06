Rails.application.routes.draw do

  devise_for :sessions
  devise_for :users
  resources :jobs
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :jobs
  end

	get '*path', to: "application#fallback_index_html", constraints: ->(request) do
	  !request.xhr? && request.format.html?
	end

end

