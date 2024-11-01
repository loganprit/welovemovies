# WeLoveMovies Backend

## Introduction

The WeLoveMovies backend is a Node.js and Express-based API that powers the movie browsing and review platform. It provides robust endpoints for managing movies, theaters, and user reviews while ensuring data consistency and performance.

## Features

- **RESTful API**: Complete CRUD operations for movies, theaters, and reviews
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Detailed error responses and logging
- **Database Management**: Efficient PostgreSQL queries and relationships
- **Authentication**: Secure endpoint protection where needed

## API Structure

- `/movies`: Movie management endpoints
- `/theaters`: Theater and showtime endpoints
- `/reviews`: Review creation and management
- `/critics`: Critic information endpoints
- `/error`: Error handling middleware

## Setup Instructions

1. Clone the repository
2. Navigate to back-end directory: `cd back-end`
3. Install dependencies: `npm install`
4. Copy `.env.sample` to `.env`
5. Setup database: `npm run migrate`
6. Seed database: `npm run seed`
7. Start server: `npm start`

## Available Scripts

- `npm start`: Launches production server
- `npm run dev`: Starts development server
- `npm test`: Runs test suite
- `npm run migrate`: Runs database migrations
- `npm run seed`: Seeds database with initial data

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web application framework
- **PostgreSQL**: Database management
- **Knex.js**: SQL query builder
- **Jest**: Testing framework

View the main README [here](../README.md).
View the front-end README [here](/front-end/README.md).
