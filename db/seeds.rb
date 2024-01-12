# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# users
# comments
# claps
# articles
# follows

# CLEAR
User.destroy_all
Article.destroy_all

# USERS

demo = User.create!(name: "Demo Guy", email: "demoguy@webium.com", password: 'password')
aaron = User.create!(name: "Aaron Aaronson", email: "aaa@webium.com", password: 'password')
bob = User.create!(name: "Bob Williams", email: "bbb@webium.com", password: 'password')
carl = User.create!(name: "Carl Jones",email: "ccc@webium.com", password: 'password')
daniel = User.create!(name: "Daniel Daniels", email: "ddd@webium.com", password: 'password')
evan = User.create!(name: "Evan Smith", email: "eee@webium.com", password: 'password')
frankie = User.create!(name: "Frankie Michaels", email: "fff@webium.com", password: 'password')
greg = User.create!(name: "Greg Smith",  email: "ggg@webium.com", password: 'password')
holly = User.create!(name: "Holly Winters",  email: "hhh@webium.com", password: 'password')
ivan = User.create!(name: "Ivan Worvich", email: "iii@webium.com", password: 'password')
jessica = User.create!(name: "Jessica Bell", email: "jjj@webium.com", password: 'password')

# # ARTICLES

article1 = Article.create!(
    user_id: demo.id,
    title:  "hello",
    content:  "hello, this is a test.",
    date_posted: '01/01/2020'
)
