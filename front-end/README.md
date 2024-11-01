# WeLoveMovies

## Introduction

WeLoveMovies is an expansive movie database application designed to help users discover movies, read detailed reviews, and find local theater showtimes. This platform caters to movie enthusiasts looking to explore a wide range of film genres and titles, offering insightful reviews and convenient viewing options.

## Problem Statement

Moviegoers often struggle to find a centralized source that provides comprehensive details about movies, including where they can watch them locally. WeLoveMovies addresses this challenge by aggregating data about movies, their reviews, and available theaters in one user-friendly interface.

## User Case

This application is ideal for:

- Movie enthusiasts who want to explore films based on genre, popularity, or new releases.
- Individuals looking for local theaters showing specific movies.
- Users interested in reading detailed reviews before watching a film.

## Intended Use

WeLoveMovies serves as a hub for:

- Browsing movies currently showing in theaters.
- Exploring detailed movie descriptions and aggregated reviews.
- Finding theaters that are showing specific movies.

## Features

- **Movie Listings**: Users can view all movies or filter to see what's currently showing.
- **Theater Showtimes**: Find out where and when you can catch a movie locally.
- **Detailed Reviews**: Access user-generated reviews for movies to gauge audience reactions and critiques.

## Technologies and Tools

- **Node.js**: Chosen for its efficiency in handling I/O-bound tasks, perfect for a data-intensive application like this.
- **Express**: Utilized for its robust routing and middleware capabilities, making it easier to manage requests and responses.
- **Knex**: Employs this SQL query builder for seamless interactions with the PostgreSQL database, allowing complex queries for movie, theater, and review data.
- **Git**: Used for version control, ensuring that development progresses smoothly in a collaborative environment.

## Discoveries

Throughout the development of WeLoveMovies, I learned to effectively structure a back-end that handles complex queries and integrates multiple data sources. Implementing CRUD operations for reviews enhanced my understanding of user interactions and data management.

## Future Goals

- **User Profiles**: Allow users to create accounts, save favorite movies, and personalize their experience.
- **Advanced Filtering**: Implement more sophisticated filtering options to sort movies by ratings, release dates, or viewer demographics.
- **Search**: Allow users to search.
- **Interactive UI**: Enhance the user interface with more interactive elements like sliders for rating and dynamic search bars.

## Screenshots

![All Movies](/images/all_movies.jpeg)
_Overview of all movies available in the database._

![All Theaters](/images/all_theaters.jpeg)
_Overview of all theaters and their movies available in the database._

![Now Showing](/images/now_showing.jpeg)
_List of movies currently showing in theaters._

![Specific Movie Details](/images/specific_movie.jpeg)
_Detailed view of a movie including reviews and showtimes._

Visit the backend repo [here](https://github.com/loganprit/welovemovies-back-end).

Visit the live application [here](https://welovemovies-front-end-ribo.onrender.com/).
