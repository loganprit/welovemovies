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

## Technologies and Tools

- **TypeScript**: Provides type safety and enhanced developer experience across both frontend and backend
- **React**: Frontend framework with TypeScript integration for building the user interface
- **Node.js**: Runtime environment for the backend, optimized for I/O-bound operations
- **Express**: Web framework for building the REST API with TypeScript support
- **PostgreSQL**: Primary database for production environment
- **SQLite**: Used for testing environment with in-memory database
- **Knex**: Type-safe SQL query builder for database interactions
- **Jest**: Testing framework configured for TypeScript testing
- **Docker**: Containerization support for consistent development and deployment

## Project Structure

- `/front-end`: React/TypeScript frontend application
  - `/src`: Source code directory
    - `/components`: Reusable UI components
    - `/movie`: Movie-related components
    - `/theaters`: Theater-related components
    - `/shared`: Shared components and utilities
    - `/types`: TypeScript type definitions
    - `/utils`: Utility functions and API clients
- `/back-end`: Express/TypeScript backend application
  - `/src`: Source code directory
    - `/db`: Database migrations and seeds
    - `/movies`: Movie-related routes and services
    - `/reviews`: Review-related routes and services
    - `/theaters`: Theater-related routes and services
    - `/types`: TypeScript type definitions

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment:
   - Copy `.env.sample` to `.env` in both front-end and back-end directories
   - Set up database connection in `DATABASE_URL`
4. Initialize database: `npm run migrate && npm run seed`
5. Start development servers: `npm start`

## Available Scripts

### Root Directory

- `npm start`: Start both frontend and backend in development mode
- `npm run build`: Build both packages for production
- `npm test`: Run tests for both packages
- `npm run type-check`: Run TypeScript type checking

### Frontend

- `npm run start:frontend`: Start frontend development server
- `npm run build`: Create production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

### Backend

- `npm run start:backend`: Start backend development server
- `npm run migrate`: Run database migrations
- `npm run seed`: Seed database with initial data
- `npm run db:reset`: Reset database (rollback, migrate, seed)

## Discoveries

This newest update to WeLoveMovies marked my first introduction to TypeScript, where I discovered the power of static typing and type safety. Through developing the backend, I learned essential TypeScript features like interfaces, type declarations, and generics while implementing complex database queries and API integrations. The process of building CRUD operations with proper type checking enhanced my understanding of both data management and the benefits of TypeScript's compile-time error detection.

## Future Goals

- **Visual Redesign**: Modernize the frontend with Tailwind CSS and create a comprehensive UI component library for consistent design.
- **Advanced Filtering**: Implement more sophisticated filtering options to sort movies by ratings, release dates, or viewer demographics.
- **Search**: Implement advanced search functionality.
- **Movie Metadata**: Expand movie information by integrating with TMDb's API.
- **Theater Location**: Add real theater search based on user location.
- **Performance**: Implement caching layer for improved response times.
- **User Accounts**: Add authentication and authorization for personalized features.

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
