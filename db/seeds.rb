
require('faker')

salary = ["61-100k","100k+"]
profession = ["product manager", "junior front end developer", "full stack developer", "senior front end developer", 
"support engineer", "UI/UX designer", "Back End Developer", "junior full stack developer"]

10.times do 
	Job.create(
	  position: profession.sample,
	  company: Faker::Company.name,
	  location: Faker::Address.city,
	  description: Faker::Lorem.paragraph(2),
	  salary: salary.sample
	)
end