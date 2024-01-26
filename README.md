# WELCOME TO WEBIUM

Check out the [Live Site!](https://webium.onrender.com/)

## Introduction

Webium is a clone of the website Medium at the time of creation.  Medium is a website that allows users from all over the internet to post articles.  It also allows users to comment on these articles, to 'clap' comments and likes to show their appreciation, and to follow each other.

I've thoroughly enjoyed reading plenty of articles on Medium, but prior to this project, I hadn't considered just how in-depth its styling is.  There's a lot that goes into making the website look just right depending on multiple factors (ie. how large your browser screen is at a given moment.)  This presented a unique challenge, and ultimately, I struck a balance between being faithful to the original styling and keeping things simple.  

The technologies used to create this project include the following:

* Languages:  Javascript, Ruby, HTML, and CSS
* Frontend:  React-Redux
* Database:  PostgreSQL
* Hosting:  Render
* Asset Storage: AWS Simple Cloud Storage (S3)

# MVPs 

## Articles

![Screenshot](readme_photos/articles.png)

Articles is the bread and butter of Webium.  Users can Create, Read, Update, and Delete articles.  It's the most essential component of the site - people come to the site to read articles.

Articles are shown individually on an article page.  Articles also have an optional photo attached - users can add this photo on creation, or update this photo when updating their article.

## Users

![Screenshot](readme_photos/users.png)

Users are able to access all the different features on Webium.  They can write and read articles.  They can also like articles, comment on articles, and follow each other.

Users have an individual profile page as well.  This page contains all of the articles they have written, as well as a display of their followers & users they're following.


## Claps
![Screenshot](readme_photos/claps.png)

Claps are a unique component that differs from most social media sites.  A user can clap an article or comment up to 50 times.  They are unable to remove these claps by design.  In the real world, when you're in the audience of a play or show, and you clap, you can't take it back - you can only choose to clap again, or stop clapping.  Pretty unique feature.

## Comments

![Screenshot](readme_photos/comments.png)

When a user wishes to comment on an article, they may click the comment icon on an article, which opens up the comment modal.  Inside this comment modal, a user can see all the different comments on the article.  A user may create, edit, and delete their comments in this space, as well as read comments left by other users on the piece.

## Follows

![Screenshot](readme_photos/follows.png)

Users are able to follow other users by clicking the appropriate button on a given article, or on a user's page.  The user pages then display this data via the amount of followers and users following that involve the selected user.



Webium was created in a two week time frame.  For ease of use, there's a demo user button on the login page that lets you jump right in.  Thanks for checking it out!
