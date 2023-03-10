# Fried Green Tomatoes

## Description: 
Fried Green Tomatoes is the name of our application. The purpose of this app is to see randomized movie ratings
and be able to search for movies as well. We believe this app is unique as the movies you see will be random, there is an easy
built in search function, and you will see multiple reviews from various sites. 

## Installation: 
To begin creating out site we wanted to grab a css framework to help us build it out. We settled on using Materialize. Once we had our frame work we built out a few sections. We created a header with a title. A search button with a text field. A card class in the middle to display json data, and finally some small dividers to grab more json data and display it. 

![Top of Website](./assets/images/tophalfofwebsite.jpg "Nav, Search bar, and Cards.")
![Bottom of Website](./assets/images/bottomhalfofwebsite.jpg "Movies with hyperlinks")
![Search Page](./assets/images/searchpage.jpg "Search Page with results.")

Once we had created the layout we began creating the java script for the project. We started by using fetch() to grab the json data from our API's. Then we used our data and appended it into a few locations. We used data from OMDB to add randomly generated movies and ratings to the bottom of our page. These movies have hyperlinks and will re-directed to the movies page. We used TMDB to append movie date to multiple cards in the middle of the screen. Finally we set up a search box and created a function that would take data from OMDB and display it on a new page. It would also display the movie poster next to it. 


https://jerrybeau89.github.io/fried-green-tomatoes/


## Usage: 
We hope this app will be used as an alternative to other movie rating websites. We believe that using data from multiple sites makes this app a one stop place to get all the information you need. It shows randomized movies, and gives you the ability to search for the exact movie you are wondering about. The search function is convenient and takes you to the search result page, and easily takes you back to run another search. 


## Credits:
 This project was worked on by Beau Bagget, Tee Yu, and Shane Pearson. We used 2 unique API's for this project. https://www.themoviedb.org/?language=en-US, and https://www.omdbapi.com/. A lot of the resources we used to create this project included in class instruction/materials, and classroom T.A. help. We also relied heavily on the API documentation and additional research for finishing our java script. 