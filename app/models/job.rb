class Job < ApplicationRecord
	validates :position, :company, :location, :description, :salary, :presence => true
	belongs_to :user
end
