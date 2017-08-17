class Sessions::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def sign_in_params
    devise_parameter_sanitizer.sanitize(:sign_in)
  end

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.

  private

  def sign_in_params
    params.require(:sessions).permit(:email, :password)
  end

  def account_update_params
    params.require(:user).permit(:name, :company_name, :phone_number, :designation, :is_agency, :email, :password, :password_confirmation, :current_password)
  end


end
