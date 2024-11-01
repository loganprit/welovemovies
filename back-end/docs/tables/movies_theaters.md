## Movies-Theaters Join Table Structure

The `movies_theaters` table is a junction table connecting movies with theaters:

```typescript
interface MovieTheater {
  movie_id: number; // Foreign Key referencing movies.movie_id
  theater_id: number; // Foreign Key referencing theaters.theater_id
  is_showing: boolean; // Indicates if movie is currently showing
}
```

### Key Features

- Composite Primary Key: `[movie_id, theater_id]`
- Foreign Key Constraints:
  - `movie_id` references `movies(movie_id)`
  - `theater_id` references `theaters(theater_id)`

### Sample Record

```json
{
  "movie_id": 1,
  "theater_id": 3,
  "is_showing": false
}
```
