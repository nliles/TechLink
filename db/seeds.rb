
require('faker')

salary = ["61-100k","100k+"]
profession = ["product manager", "junior front end developer", "full stack developer", "senior front end developer", 
"support engineer", "web designer", "UI/UX designer", "Back End Developer", "junior full stack developer"]


User.create(email: "Susan@gmail.com", password: "hellohello")
User.create(email: "Bob@gmail.com", password: "helloworld")


5.times do 
	Job.create(
	  user_id: 1,
	  position: profession.sample,
	  company: Faker::Company.name,
	  location: Faker::Address.city,
	  description: Faker::Lorem.paragraph(3),
	  salary: salary.sample
	)
end

5.times do 
	Job.create(
	  user_id: 2,
	  position: profession.sample,
	  company: Faker::Company.name,
	  location: Faker::Address.city,
	  description: Faker::Lorem.paragraph(3),
	  salary: salary.sample
	)
end