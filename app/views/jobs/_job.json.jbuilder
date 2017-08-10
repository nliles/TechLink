json.extract! job, :id, :position, :company, :location, :description, :salary, :created_at, :updated_at
json.url job_url(job, format: :json)
