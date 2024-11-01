# WeLoveMovies

Visit the live application [here](https://welovemovies-front-end-ribo.onrender.com/)!

## Introduction

WeLoveMovies is a movie database application designed to help users discover movies, read detailed reviews, and find local theater showtimes. This platform caters to movie enthusiasts looking to explore a wide range of film genres and titles, offering insightful reviews and convenient viewing options.

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

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.sample` to `.env` in both front-end and back-end directories
4. Configure environment variables
5. Start development servers: `npm start`

## Available Scripts

- `npm start`: Start both frontend and backend in development mode
- `npm run start:frontend`: Start only frontend
- `npm run start:backend`: Start only backend
- `npm run build`: Build frontend for production
- `npm test`: Run tests for both packages

## Project Structure

- `/front-end`: React frontend application
- `/back-end`: Express backend application

## Technologies and Tools

- **Node.js**: Chosen for its efficiency in handling I/O-bound tasks, perfect for a data-intensive application like this.
- **Express**: Utilized for its robust routing and middleware capabilities, making it easier to manage requests and responses.
- **Knex**: Employs this SQL query builder for seamless interactions with the PostgreSQL database, allowing complex queries for movie, theater, and review data.
- **Git**: Used for version control, ensuring that development progresses smoothly in a collaborative environment.

## Discoveries

Throughout the development of WeLoveMovies, I learned to effectively structure a back-end that handles complex queries and integrates multiple data sources. Implementing CRUD operations for reviews enhanced my understanding of user interactions and data management.

## Future Goals

- **Advanced Filtering**: Implement more sophisticated filtering options to sort movies by ratings, release dates, or viewer demographics.
- **Search**: Implement advanced search functionality.
- **Movie Metadata**: Expand movie information by integrating with TMDb's API.
- **Theater Location**: Add real theater search based on user location.
- **Performance**: Implement caching layer for improved response times.
- **User Accounts**: Add authentication and authorization for personalized features.
- **TypeScript Transition**: Transition to TypeScript for type safety

## Screenshots

<table>
<tr>
<td width="50%">

![All Movies](/images/all_movies.jpeg)
_Overview of all movies available in the database._

</td>
<td width="50%">

![Now Showing](/images/now_showing.jpeg)
_List of movies currently showing in theaters._

</td>
</tr>
<tr>
<td width="50%">

![All Theaters](/images/all_theaters.jpeg)
_Overview of all theaters and their movies available in the database._

</td>
<td width="50%">

![Specific Movie Details](/images/specific_movie.jpeg)
_Detailed view of a movie including reviews and showtimes._

</td>
</tr>
</table>

View the front-end README [here](/front-end/README.md). </br>
View the back-end README [here](/back-end/README.md).
