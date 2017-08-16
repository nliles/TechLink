class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :jobs
  # before_create :generate_authentication_token!
  # validates :auth_token, uniqueness: true

  # def generate_authentication_token!
  #   begin
  #     self.auth_token = Devise.friendly_token
  #   end while self.class.exists?(auth_token: auth_token)
  # end

end


# new_auth_header = @resource.create_new_auth_token(client_id)

# # update response with the header that will be required by the next request
# response.headers.merge!(new_auth_header)