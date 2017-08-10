
require('faker')

100.times do 
	Job.create(
	  position: Faker::Company.profession,
	  company: Faker::Company.name,
	  location: Faker::Address.city,
	  description: Faker::Company.catch_phrase,
	  salary: "50,000k"
	)
end