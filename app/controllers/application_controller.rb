class ApplicationController < ActionController::API 
  include ActionController::MimeResponds 
  respond_to :json

  def fallback_index_html
    render :file => 'public/index.html'
  end

  include Authenticable
end