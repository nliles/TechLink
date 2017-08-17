# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

run Rails.application

heroku config:set NPM_CONFIG_PRODUCTION=false