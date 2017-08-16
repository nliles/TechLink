class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  respond_to :json

  include Authenticable
end