class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  respond_to :json

 before_action :configure_permitted_parameters, if: :devise_controller?

  protected


 def configure_permitted_parameters
 debugger
  devise_parameter_sanitizer.permit(:sign_in) do |user_params|
  	debugger
    user_params.permit(:username, :email)
   end
 end

  # include Authenticable
end