## Movies Table Structure

The `movies` table stores movie information with the following schema:

```typescript
interface Movie {
  movie_id: number; // Primary Key, Auto-incrementing
  title: string; // Movie title
  runtime_in_minutes: number; // Movie duration
  rating: string; // Movie rating (e.g., "PG", "R")
  description: string; // Movie description/synopsis
  image_url: string; // URL to movie poster image
  created_at: Date; // Timestamp of record creation
  updated_at: Date; // Timestamp of last update
}
```

### Sample Record

```json
{
  "movie_id": 1,
  "title": "Spirited Away",
  "runtime_in_minutes": 125,
  "rating": "PG",
  "description": "Chihiro and her parents are moving to a small Japanese town...",
  "image_url": "https://imdb-api.com/...",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```
