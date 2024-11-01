# WeLoveMovies Frontend

## Introduction

The WeLoveMovies frontend is a React-based web application that provides an intuitive interface for browsing movies, theaters, and reviews. It focuses on delivering a seamless user experience through responsive design and interactive components.

## Features

- **Movie Browser**: Interactive grid view of movies with filtering options
- **Theater Locator**: Map-based interface showing nearby theaters
- **Review System**: Clean, organized display of user reviews with ratings
- **Responsive Design**: Optimized layout for both desktop and mobile devices
- **Dynamic Routing**: Smooth navigation between different views using React Router

## Component Structure

- `Header`: Main navigation and branding
- `MovieList`: Displays grid of available movies
- `TheaterView`: Shows theater information and current showings
- `ReviewSection`: Handles display and submission of reviews
- `ErrorAlert`: Manages error state display

## Setup Instructions

1. Clone the repository
2. Navigate to front-end directory: `cd front-end`
3. Install dependencies: `npm install`
4. Copy `.env.sample` to `.env`
5. Start development server: `npm start`

## Available Scripts

- `npm start`: Launches development server
- `npm test`: Runs test suite
- `npm run build`: Creates production build
- `npm run eject`: Ejects from Create React App

## Technologies Used

- **React**: Core frontend framework
- **React Router**: Client-side routing
- **Bootstrap**: Styling and responsive design
- **Axios**: API request handling

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

View the main README [here](../README.md). </br>
View the back-end README [here](/back-end/README.md).
