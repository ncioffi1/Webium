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

require "open-uri"

# CLEAR
User.destroy_all
Article.destroy_all
Comment.destroy_all
Clap.destroy_all

puts "resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('articles')
ApplicationRecord.connection.reset_pk_sequence!('comments')
# ApplicationRecord.connection.reset_pk_sequence!('claps')

# USERS

demo = User.create!(name: "Demo Guy", email: "demoguy@webium.com", password: 'password')
demo.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/demo.jpg"), 
    filename: "demo.jpg"
)
aaron = User.create!(name: "Aaron Aaronson", email: "aaa@webium.com", password: 'password')
aaron.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/aaron.jpg"), 
    filename: "aaron.jpg"
)
bob = User.create!(name: "Bob Williams", email: "bbb@webium.com", password: 'password')
bob.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/bob.jpg"), 
    filename: "bob.jpg"
)
carl = User.create!(name: "Carl Jones",email: "ccc@webium.com", password: 'password')
carl.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/carl.jpg"), 
    filename: "carl.jpg"
)
daniel = User.create!(name: "Daniel Daniels", email: "ddd@webium.com", password: 'password')
daniel.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/daniel.jpg"), 
    filename: "daniel.jpg"
)
evan = User.create!(name: "Evan Smith", email: "eee@webium.com", password: 'password')
evan.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/evan.jpg"), 
    filename: "evan.jpg"
)
frankie = User.create!(name: "Frankie Michaels", email: "fff@webium.com", password: 'password')
frankie.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/frankie.jpg"), 
    filename: "frankie.jpg"
)
greg = User.create!(name: "Greg Smith",  email: "ggg@webium.com", password: 'password')
greg.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/greg.jpg"), 
    filename: "greg.jpg"
)
holly = User.create!(name: "Holly Winters",  email: "hhh@webium.com", password: 'password')
holly.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/holly.jpg"), 
    filename: "holly.jpg"
)
ivan = User.create!(name: "Ivan Worvich", email: "iii@webium.com", password: 'password')
ivan.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/ivan.jpg"), 
    filename: "ivan.jpg"
)
jessica = User.create!(name: "Jessica Bell", email: "jjj@webium.com", password: 'password')
jessica.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/jessica.jpg"), 
    filename: "jessica.jpg"
)

# # ARTICLES

article1 = Article.create!(
    user_id: demo.id,
    title:  "hello",
    content:  "hello, this is a test.",
    date_posted: '12/01/2020'
)
article1.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/maltese.jpg"), 
    filename: "maltese.jpg"
)

article2 = Article.create!(
    user_id: frankie.id,
    title:  "The Zen of Indoor Gardening: Cultivating Tranquility at Home",
    content:  "In the whirlwind of modern life, finding calm is a challenge. Enter indoor gardening, a practice that goes beyond decor, offering tangible benefits for well-being.
    Indoor gardening isn't just about prettying up your space; it's about cultivating a healthier, happier environment. Studies show the positive impact of surrounding ourselves with greenery, from improved air quality to reduced stress levels.
    Transform your workspace into a haven of productivity and tranquility by incorporating indoor plants. The presence of greenery has been linked to increased focus, creativity, and overall job satisfaction.
    Engaging with plants has therapeutic benefits, reducing cortisol levels and promoting relaxation. Tending to your indoor garden becomes a form of mindfulness, nurturing not just plants but also your mental well-being.
    Imagine plucking fresh herbs like basil or mint right from your kitchen. An indoor herb garden elevates your cooking and ensures a steady supply of flavorful additions to your meals.
    Indoor gardening aligns with sustainable living. By cultivating your own plants, you contribute to a greener planet. Caring for indoor plants is a small yet impactful step towards fostering an eco-friendly lifestyle.
    In the realm of indoor gardening, the benefits extend beyond visual appeal. It's a practice rooted in real-world advantages – cleaner air, reduced stress, and a daily breath of fresh air, cultivating tranquility in your everyday life.",
    date_posted: '11/01/2021'
)
article2.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/indoor-gardening.jpg"), 
    filename: "indoor-gardening.jpg"
)

article3 = Article.create!(
    user_id: greg.id,
    title:  "Exploring the Art of Bullet Journaling",
    content: "Bullet journaling has taken the planner world by storm, offering a unique and customizable approach to organization and creativity. As someone who has delved into the mesmerizing world of bullet journaling, I'm here to share insights and tips on how this art form can transform your daily life.
    In the chaotic hustle of our modern lives, the bullet journal stands out as a versatile tool. It combines a planner, to-do list, and diary, allowing you to structure your day while leaving room for artistic expression. Unlike traditional planners, bullet journals adapt to your needs, making them perfect for those who crave flexibility in their organization methods.
    Before you dive into the colorful realm of bullet journaling, let's start with the basics. All you need is a blank notebook and your favorite writing tools. The key to a successful bullet journal lies in its rapid logging system. Tasks, events, and notes are represented by simple symbols, turning your journal into an efficient visual organizer.
    Now comes the exciting part – adding your unique flair to the pages. Your bullet journal is a canvas waiting to be filled with color, doodles, and personal touches. Whether you're an aspiring artist or someone who can barely draw a stick figure, there's a space for you in the world of bullet journaling.
    Feel free to experiment with different layouts, trackers, and themes. Use washi tape, stickers, or even pressed flowers to adorn your pages. The key is to make your bullet journal a reflection of your personality. After all, it's not just a planner; it's a piece of art that tells your story.
    One of the challenges of maintaining a bullet journal is consistency. Life gets busy, and it's easy to forget to update your journal regularly. However, that's the beauty of this system – it's forgiving. Missed a day or a week? No worries. Just pick up where you left off.
    Adaptability is at the core of bullet journaling. Your needs and preferences will evolve, and so should your journal. Don't be afraid to tweak your layouts or try new tracking methods. The more you adapt your bullet journal to suit your lifestyle, the more effective and enjoyable it becomes.
    Approach your bullet journaling journey with an enthusiastically inquisitive mindset. Ask questions, seek inspiration from others in the vibrant bullet journaling community, and don't be afraid to make mistakes. Your bullet journal is a reflection of your journey, and every stroke of the pen is a step toward self-discovery and organization.
    In conclusion, bullet journaling is not just a planner; it's a canvas of infinite possibilities. Embrace the artistic freedom it offers, stay consistent in your own way, and let your personality shine through every page. As you navigate this creative organizational method, remember that your bullet journal is as unique as you are. So, go ahead!  Explore, create, and enjoy the journey of bullet journaling.",
    date_posted: '05/02/2023'
)
article3.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/bullet-journaling.jpg"), 
    filename: "bullet-journaling.jpg"
)


article4 = Article.create!(
    user_id: greg.id,
    title:  "From Couch to 5K: A Beginner's Guide to Running",
    content:  "Embarking on a running journey from the cozy confines of your couch to conquering a 5K can be a transformative experience for both your body and mind. In this guide, we'll explore the essential steps for beginners to kickstart their running routine and gradually build up to the coveted 5K finish line.\n\nBefore you lace up your running shoes, it's crucial to start with a solid plan. Begin with brisk walks to condition your body and gradually introduce short running intervals. This gradual approach minimizes the risk of injury and allows your muscles to adapt to the demands of running.\n\nInvesting in proper running gear can make a significant difference in your comfort and performance. A good pair of running shoes, moisture-wicking clothing, and a supportive sports bra are essentials. Consider consulting with experts at a local running store to find the perfect shoes for your foot type.\n\nBuilding stamina is a key component of transitioning from a sedentary lifestyle to running a 5K. Start with a manageable pace and duration, focusing on consistent progress. As your endurance improves, gradually increase running intervals and reduce walking periods until you can sustain continuous running for the entire 5K distance.\n\nSetting realistic and achievable goals is essential for staying motivated. Break down your running journey into smaller milestones, such as completing a certain distance without stopping or improving your pace. Celebrate these achievements to stay inspired throughout your training.\n\nTo support your running journey, incorporate strength training exercises to build muscular endurance. Targeting key muscle groups, such as your core, legs, and hips, enhances your overall running performance and reduces the risk of injuries.\n\nPay attention to your body's signals and prioritize rest and recovery. Soreness is normal, but persistent pain may indicate overtraining. Incorporate rest days into your schedule and consider activities like yoga or stretching to enhance flexibility and prevent injuries.\n\nJoining a running group or seeking support from friends and family can provide motivation and accountability. Sharing your progress and challenges with others who are on a similar journey creates a sense of camaraderie and fosters a supportive community.\n\nAs you approach your 5K goal, visualize yourself crossing the finish line. The sense of accomplishment and the physical and mental benefits of regular running will be your reward. Embrace the journey, celebrate your successes, and remember that every step brings you closer to achieving your running aspirations.\n\nIn conclusion, the transition from couch to 5K is a rewarding endeavor that requires dedication, patience, and self-compassion. By following this beginner's guide, you'll not only transform your physical fitness but also discover the joy and empowerment that running brings to your life.",
    date_posted: '09/01/2024'
)
article4.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/running.jpg"), 
    filename: "running.jpg"
)

article5 = Article.create!(
    user_id:  daniel.id,
    title: "Culinary Rebels, Unite! Chaos Cooking Recipes",
    content: "Are you tired of the same old, predictable recipes? Do you crave excitement in the kitchen? It's time for culinary rebels to unite and embrace the art of chaos cooking. In this guide, we'll explore unconventional recipes that break free from traditional norms, inviting you to unleash your creativity and redefine the culinary experience.\n\nDitch the precise measurements and let your instincts guide you. Chaos cooking is about embracing spontaneity and experimenting with flavors. Start with a base ingredient, trust your taste buds, and build a masterpiece without the constraints of a recipe.\n\nOne chaos cooking favorite is the 'Anything-Goes Stir-Fry.' Raid your fridge and toss together a medley of vegetables, proteins, and sauces. The result? A symphony of flavors and textures that defy culinary conventions. Don't be afraid to combine unexpected ingredients – the more, the merrier!\n\nFor those with a sweet tooth, try the 'Kitchen Sink Cookies.' Gather an assortment of leftover sweets, from chocolate chips to crushed candies, and fold them into cookie dough. Every bite is a delightful surprise, and no two cookies will ever be the same. It's cookie chaos at its finest.\n\nSpice up your breakfast routine with a 'Rebel Omelette.' Raid your pantry for spices, cheeses, and whatever veggies you have on hand. There's no need to follow a recipe – just let your taste buds guide you. This breakfast masterpiece is a celebration of freedom and flavor.\n\nChaos cooking extends beyond dishes; it's a mindset. Break away from conventional plating and presentation. Embrace the messy, asymmetrical, and eclectic. The goal is to create an experience that transcends the ordinary and stimulates all the senses.\n\nGather fellow culinary rebels for a chaos cooking potluck. Encourage each participant to bring their own chaotic creation, and let the tasting adventure begin. Share stories, swap cooking tips, and revel in the delicious rebellion against culinary norms.\n\nAs you embark on your chaos cooking journey, remember that there are no rules – only possibilities. Let your creativity run wild, and savor the joy of breaking free from the culinary constraints. Culinary rebels, unite! Embrace chaos cooking, and let every meal be a daring exploration of flavors and imagination.",
    date_posted:  '04/06/2023'
)
article5.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/chaotic-cooking.jpg"), 
    filename: "chaotic-cooking.jpg"
)

article6 = Article.create!(
    user_id:  carl.id,
    title: "Weekend Project: DIY Teleportation Devices",
    content: "Ever wanted to go places super fast, like in the movies? Well, teleportation might not be real yet, but why not make your own teleportation devices for the weekend? This guide will tell you how, and it's gonna be super fun!\n\nThe 'Teleportation-in-a-Box' project is like, for beginners. Grab an old box, some blinky lights, and let's get creative! Make the box look like space or something, and now it's a portal. Blink, blink, teleportation party!\n\nFor folks who like tech stuff, there's the 'Quantum Leap Wristwatch.' All you need is a watch, some more lights, and a bit of code magic. You won't actually go to space, but people will be like, 'Whoa, cool watch!' And you'll be the star.\n\nFeeling artsy? Try the 'Canvas of Portals.' Paint a picture that looks like a door to faraway lands. Stare at it, and imagine you're there. It's like a vacation for your eyes, right in your room!\n\nThen there's the 'Mirror of Reflections.' Take an old mirror, draw some cool stuff around it, and stare at yourself. Imagine you're in another world. It's teleportation, but with a mirror twist. So simple, even I get it!\n\nRemember, these DIY teleportation devices won't really take you anywhere, but they'll make your weekend awesome. Get your friends, get your family, and let's have a super cool time making these fun projects. You might not go to space, but you'll definitely go to a place of fun and imagination!",
    date_posted:  '01/05/2023'
)
article6.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/teleportation-device.jpg"), 
    filename: "teleportation-device.jpg"
)

article7 = Article.create!(
    user_id:  jessica.id,
    title: "Love in Parallel Universes: The Quantum Dating Guide",
    content: "Finding love can feel like jumping between parallel universes, right? Well, why not mix romance with a bit of quantum theory? This Quantum Dating Guide is here to help you navigate the multiverse of relationships.\n\nEver thought about meeting your soulmate from another universe? With 'Quantum Speed Dating,' you get to meet multiple versions of potential partners in one night. It's like Tinder but with a twist – different realities! Swipe right across dimensions and find the perfect match.\n\nIf you're more of a traditional dater, try 'Entangled Hearts Dinner.' Cook a romantic meal, set the ambiance, and connect with your partner on a deeper level. It's like the quantum entanglement of emotions – when you're in sync, no distance can keep you apart.\n\nFeeling adventurous? Take a trip to 'The Wormhole Café.' A unique spot where each table is in a different universe. You and your date can experience multiple realities while sipping on your favorite beverages. It's a date and an adventure all in one!\n\nFor those who like surprises, there's 'Schrodinger's Date Box.' Prepare two boxes, each with a different date idea. Your partner chooses one, and the uncertainty adds a thrilling element to your date night. Will it be a movie night or a stargazing adventure? Only the universe knows!\n\nSo, if you're tired of conventional dating and want to explore love in parallel universes, give these quantum-inspired ideas a try. Love might just be a jump away in the vast expanse of the multiverse!",
    date_posted:  '01/10/2023'
)
article7.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/love-rocks.jpg"), 
    filename: ".jpg"
)

article8 = Article.create!(
    user_id:  frankie.id,
    title:  "Living Green: Embracing Eco-Friendly Joys",
    content:  "Hello, wonderful souls! Here's a guide to a vibrant and eco-conscious lifestyle. Today, let's embark on a journey to discover the sheer delight of embracing sustainable living. It's not a trend; it's a beautiful dance with our planet.
    Imagine waking up to the soothing hum of nature outside your window. In a world that's often bustling, find solace in the simplicity of a sunrise – a reminder that every day is a fresh canvas to paint with eco-friendly choices.
    As you step into the bustling streets, let eco-enthusiasm blossom. Swap your morning coffee cup for a reusable one, and watch as your simple act ripples into a wave of positive change. It's not just a cup; it's a vessel for sustainable sipping.
    In the realm of sustainable living, daily tasks become rituals of love for Mother Earth. Nourish your body with locally sourced produce, transforming your kitchen into a sanctuary of conscious cooking. Each meal is a celebration of mindful choices and a small triumph in the grand symphony of eco-friendly living.
    Let's talk about the joy of repurposing, dear readers. It's not just decluttering; it's a dance of creative renewal. Transform old mason jars into charming plant pots, and watch your space bloom with greenery. It's not just recycling; it's a testament to the endless possibilities of sustainable joy.
    As our journey to sustainable delights unfolds, remember, embrace the beauty of eco-friendly living. It's not a sacrifice; it's a harmonious collaboration with nature. Dance through life with an eco-friendly rhythm, and let each step be a joyful leap towards a greener future.
    Until our paths cross again, may your days be filled with sustainable joys and your hearts with boundless eco-enthusiasm!",
    date_posted:  '02/01/2024'
)
article8.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/eco-friendly.jpg"), 
    filename: "eco-friendly.jpg"
)

article9 = Article.create!(
    user_id: frankie.id,
    title:  "Living La Vida Green: Sprouting Joy in the City",
    content:  "Hey there, fellow urban dwellers!  Today, we're diving into the wonderful world of urban gardening.  Get ready to experience a dash of green magic in the heart of the city.
    Ever felt the need for a leafy escape from the chaos outside your window? Well, my friend, it's time to embrace the dirt and discover the joy of cultivating your own green haven amidst the hustle and bustle.
    Imagine this: a cozy balcony adorned with hanging planters and a riot of colors from blossoming flowers. Your windowsill transforms into a mini herb garden, making every meal a culinary adventure. Now, doesn't that sound like a whimsical urban dream?
    Urban gardening isn't just about plants; it's about crafting your oasis, one seed at a time. So, grab your gardening gloves and join me in this green journey. No backyard? No problem! All you need is a small space and a pinch of enthusiasm.
    Let's talk plant choices. Picture this: succulents greeting you at the entrance, resilient and ever cheerful. They're the ultimate urban warriors, requiring minimal care and adding a touch of whimsy to your living space. Plus, nothing beats the joy of seeing your succulent collection thrive in the midst of city life.
    Now, let's sprinkle some color into your life with vibrant flowers. Potted daisies, sunflowers, or marigolds... the choices are endless. Trust me; a burst of floral hues can turn even the gloomiest day into a colorful fiesta.
    As we cultivate our little urban oasis, it's essential to water not just the plants but also our own spirits. Gardening isn't just a hobby; it's a therapeutic escape from the daily grind. Tending to your green companions becomes a form of meditation, grounding you in the present moment.
    Now, as we wrap up our urban gardening escapade, remember:  turning your living space into a green paradise is more than just a trend; it's a lifestyle. Embrace the dirt under your nails, relish the moments spent with your leafy friends, and watch how they transform your home into a haven of joy.
    Happy gardening, city dwellers!",
    date_posted: '09/06/2022'
)
article9.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/eco-city.jpg"), 
    filename: "eco-city.jpg"
)


article10 = Article.create!(
    user_id:  frankie.id,
    title:  "Frankie Michaels - The Eco-Warrior",
    content:  "Hey there, fellow Earth lovers! Today, let's dive into the world of eco-friendly living and discover how tiny changes can make a monumental impact on our beloved planet. We all know the mantra: Reduce, Reuse, Recycle. But how about we add a new one: Rethink. Yep, it's time to rethink our choices and start a revolution—one that's as easy as it is impactful.
    Let's talk fashion, my friends! I know, I know, fast fashion is tempting, but we can do better. Explore the realms of second-hand treasures and sustainable fashion brands. Your wardrobe will thank you, and so will the planet.
    Now, onto the heart of the home—the kitchen! Unleash your inner chef by adopting a plant-powered diet. No, I'm not saying go vegan (unless you want to). Just swap out some meaty meals for delicious plant-based alternatives. Your taste buds will be dancing, and the environment will be cheering.
    Getting around town doesn't have to involve gas-guzzling monsters. Embrace the simplicity and sustainability of pedal power! Hop on a bike, and not only will you be reducing your carbon footprint, but you'll also be giving yourself a mini workout. Win-win!
    For those of us stuck in the corporate grind, fear not! Transform your office space into a green haven. Add a touch of nature with some potted plants. Not only will it freshen up your workspace, but it'll also boost your mood. A win for productivity and the planet.
    As we conclude our eco-friendly escapade, remember, it's not about being perfect. It's about making conscious choices that align with our values. The eco-warrior within us knows that every small change adds up to create a massive impact. So, let's continue this journey together, one sustainable step at a time.
    Keep it green, keep it clean!",
    date_posted: '21/12/2006'
)
article10.photo.attach(
    io: URI.open("https://webium-seeds.s3.amazonaws.com/eco-warrior.jpg"), 
    filename: "eco-warrior.jpg"
)

comment1 = Comment.create!(
    user_id:  greg.id,
    commentbody:  "Wow!  This was a great read.  Loved it!  \nHope to see more articles from you soon!",
    article_id:  article5.id,
    parent_comment_id: nil
)

comment2 = Comment.create!(
    user_id:  aaron.id,
    commentbody:  "Agreed.  Enjoyed reading the article!",
    article_id:  article5.id,
    parent_comment_id:  comment1.id
)

comment3 = Comment.create!(
    user_id:  frankie.id,
    commentbody:  "Wasn't a fan of this one, personally.",
    article_id:  article5.id,
    parent_comment_id: nil
)

comment4 = Comment.create!(
    user_id:  jessica.id,
    commentbody:  "Great article!",
    article_id:  article5.id,
    parent_comment_id:  nil
)

comment5 = Comment.create!(
  user_id: greg.id,
  commentbody: "I really enjoyed reading this article. It provided valuable insights and was well-written. Looking forward to more content like this!",
  article_id: article1.id,
  parent_comment_id: nil
)

comment6 = Comment.create!(
  user_id: 1,
  commentbody: "This article caught my attention with its interesting subject matter. The author did a great job presenting the information. Thumbs up!",
  article_id: article2.id,
  parent_comment_id: nil
)

comment7 = Comment.create!(
  user_id: 1,
  commentbody: "Kudos to the writer! The content was well-researched and presented in a way that kept me engaged throughout. Well done!",
  article_id: article3.id,
  parent_comment_id: nil
)

comment8 = Comment.create!(
  user_id: 1,
  commentbody: "I found this article to be really informative. The author covered the topic thoroughly, and I appreciated the depth of analysis. Great content!",
  article_id: article4.id,
  parent_comment_id: nil
)

comment9 = Comment.create!(
  user_id: 1,
  commentbody: "Thoroughly enjoyed this piece. The writing style is captivating, and the insights provided are valuable. Looking forward to more from this author!",
  article_id: article5.id,
  parent_comment_id: nil
)

comment10 = Comment.create!(
  user_id: greg.id,
  commentbody: "The author presented some insightful perspectives in this article. I appreciate the thoughtfulness and clarity in the writing. Impressive!",
  article_id: article6.id,
  parent_comment_id: nil
)

comment11 = Comment.create!(
  user_id: greg.id,
  commentbody: "Bravo! This article was a fantastic read. The content was well-organized, and the author's expertise shone through. Thumbs up!",
  article_id: article7.id,
  parent_comment_id: nil
)

comment12 = Comment.create!(
  user_id: greg.id,
  commentbody: "Fantastic job on this one! The author's writing style is engaging, making it easy to connect with the content. Well said!",
  article_id: article8.id,
  parent_comment_id: nil
)

comment13 = Comment.create!(
  user_id: greg.id,
  commentbody: "Impressive work! I really liked the way the author approached the topic. The depth of analysis adds a lot of value to the content. Keep it up!",
  article_id: article9.id,
  parent_comment_id: nil
)

comment14 = Comment.create!(
  user_id: greg.id,
  commentbody: "Great job! This article provided valuable insights in an easily digestible format. Looking forward to more content from this source!",
  article_id: article10.id,
  parent_comment_id: nil
)

comment15 = Comment.create!(
  user_id: jessica.id,
  commentbody: "I'm truly impressed by this article. The author covered the topic comprehensively, and the writing style kept me engaged from start to finish. Well done!",
  article_id: article5.id,
  parent_comment_id: nil
)

comment16 = Comment.create!(
  user_id: jessica.id,
  commentbody: "Loved the insights shared in this piece. The author's perspective adds a unique flavor to the content, making it a standout read. Kudos!",
  article_id: article6.id,
  parent_comment_id: nil
)

comment17 = Comment.create!(
  user_id: jessica.id,
  commentbody: "Well said! This article articulated the subject matter beautifully. The thoughtful analysis and clear presentation make it a valuable read. Thumbs up!",
  article_id: article7.id,
  parent_comment_id: nil
)

comment18 = Comment.create!(
  user_id: jessica.id,
  commentbody: "Impressive work! The depth of information provided in this article is commendable. The author's expertise shines through, making it a top-notch piece of content.",
  article_id: article8.id,
  parent_comment_id: nil
)

comment19 = Comment.create!(
  user_id: jessica.id,
  commentbody: "Keep up the fantastic work! This article was a joy to read, and the author's writing style made the content easily relatable. Well done!",
  article_id: article9.id,
  parent_comment_id: nil
)

comment20 = Comment.create!(
  user_id: jessica.id,
  commentbody: "Another great job! The insights presented in this article are valuable, and the overall presentation is excellent. Looking forward to more content from this source!",
  article_id: article10.id,
  parent_comment_id: nil
)

# Evan likes 8 articles
# clap1 = Clap.create!(user_id: 1, article_id: 1, comment_id: nil)
clap1 = Clap.create!(user_id: evan.id, article_id: article1.id, comment_id: nil)
clap2 = Clap.create!(user_id: evan.id, article_id: article2.id, comment_id: nil)
clap3 = Clap.create!(user_id: evan.id, article_id: article3.id, comment_id: nil)
clap4 = Clap.create!(user_id: evan.id, article_id: article4.id, comment_id: nil)
clap5 = Clap.create!(user_id: evan.id, article_id: article6.id, comment_id: nil)
clap6 = Clap.create!(user_id: evan.id, article_id: article7.id, comment_id: nil)
clap7 = Clap.create!(user_id: evan.id, article_id: article8.id, comment_id: nil)
clap8 = Clap.create!(user_id: evan.id, article_id: article9.id, comment_id: nil)

# Aaron likes 10 articles
clap9 = Clap.create!(user_id: aaron.id, article_id: article1.id, comment_id: nil)
clap10 = Clap.create!(user_id: aaron.id, article_id: article2.id, comment_id: nil)
clap11 = Clap.create!(user_id: aaron.id, article_id: article3.id, comment_id: nil)
clap12 = Clap.create!(user_id: aaron.id, article_id: article4.id, comment_id: nil)
clap13 = Clap.create!(user_id: aaron.id, article_id: article5.id, comment_id: nil)
clap14 = Clap.create!(user_id: aaron.id, article_id: article6.id, comment_id: nil)
clap15 = Clap.create!(user_id: aaron.id, article_id: article7.id, comment_id: nil)
clap16 = Clap.create!(user_id: aaron.id, article_id: article8.id, comment_id: nil)
clap17 = Clap.create!(user_id: aaron.id, article_id: article9.id, comment_id: nil)
clap18 = Clap.create!(user_id: aaron.id, article_id: article10.id, comment_id: nil)

# Bob likes 8 articles
clap19 = Clap.create!(user_id: bob.id, article_id: article1.id, comment_id: nil)
clap20 = Clap.create!(user_id: bob.id, article_id: article3.id, comment_id: nil)
clap21 = Clap.create!(user_id: bob.id, article_id: article4.id, comment_id: nil)
clap22 = Clap.create!(user_id: bob.id, article_id: article5.id, comment_id: nil)
clap23 = Clap.create!(user_id: bob.id, article_id: article6.id, comment_id: nil)
clap24 = Clap.create!(user_id: bob.id, article_id: article7.id, comment_id: nil)
clap25 = Clap.create!(user_id: bob.id, article_id: article8.id, comment_id: nil)
clap26 = Clap.create!(user_id: bob.id, article_id: article9.id, comment_id: nil)

# Carl likes 8 articles
clap27 = Clap.create!(user_id: carl.id, article_id: article1.id, comment_id: nil)
clap28 = Clap.create!(user_id: carl.id, article_id: article2.id, comment_id: nil)
clap29 = Clap.create!(user_id: carl.id, article_id: article4.id, comment_id: nil)
clap30 = Clap.create!(user_id: carl.id, article_id: article5.id, comment_id: nil)
clap31 = Clap.create!(user_id: carl.id, article_id: article6.id, comment_id: nil)
clap32 = Clap.create!(user_id: carl.id, article_id: article7.id, comment_id: nil)
clap33 = Clap.create!(user_id: carl.id, article_id: article8.id, comment_id: nil)
clap34 = Clap.create!(user_id: carl.id, article_id: article9.id, comment_id: nil)

# Daniel likes 6 articles
clap35 = Clap.create!(user_id: daniel.id, article_id: article1.id, comment_id: nil)
clap36 = Clap.create!(user_id: daniel.id, article_id: article2.id, comment_id: nil)
clap37 = Clap.create!(user_id: daniel.id, article_id: article3.id, comment_id: nil)
clap38 = Clap.create!(user_id: daniel.id, article_id: article5.id, comment_id: nil)
clap39 = Clap.create!(user_id: daniel.id, article_id: article6.id, comment_id: nil)
clap40 = Clap.create!(user_id: daniel.id, article_id: article7.id, comment_id: nil)

# users:
# demo
# aaron 
# bob 
# carl
# daniel 
# evan 
# frankie 
# greg
# holly
# ivan 

