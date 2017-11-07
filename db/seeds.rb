
require('faker')

salary = ["61-100k","100k+"]
profession = ["product manager", "junior front end developer", "full stack developer", "senior front end developer", 
"support engineer", "web designer", "Back End Developer", "junior full stack developer"]


User.create(email: "Susan@gmail.com", password: "hellohello")
User.create(email: "Bob@gmail.com", password: "helloworld")

2.times do 
	Job.create(
	  user_id: 1,
	  position: profession.sample,
	  company: "Facebook",
	  location: "770 Broadway (at E 9th St), New York, NY 10003",
	  lat: "40.731173",
	  lng: "-73.991927",
	  description: Faker::Lorem.paragraph(5),
	  salary: salary.sample
	)
end


3.times do 
	Job.create(
	  user_id: 1,
	  position: profession.sample,
	  company: "Google",
	  location: "345 Spear St, San Francisco, CA 94105",
	  lat: "37.790052",
	  lng: "-122.390184",
	  description: Faker::Lorem.paragraph(5),
	  salary: salary.sample
	)
end

3.times do 
	Job.create(
	  user_id: 2,
	  position: profession.sample,
	  company: "Google",
	  location: "111 8th Ave, New York, NY 10011",
	  lat: "40.741355",
	  lng: "-74.003203",
	  description: Faker::Lorem.paragraph(3),
	  salary: salary.sample
	)
end

2.times do 
	Job.create(
	  user_id: 2,
	  position: profession.sample,
	  company: "IBM",
	  location: " 590 Madison Ave, New York, NY 10022",
	  lat: "40.762250",
	  lng: "-73.972370",
	  description: Faker::Lorem.paragraph(3),
	  salary: salary.sample
	)
end