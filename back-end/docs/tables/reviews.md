## Reviews Table Structure

The `reviews` table stores movie reviews with the following schema:

```typescript
interface Review {
  review_id: number; // Primary Key, Auto-incrementing
  content: string; // Review content in markdown format
  score: number; // Numerical score given to the movie
  critic_id: number; // Foreign Key referencing critics.critic_id
  movie_id: number; // Foreign Key referencing movies.movie_id
  created_at: Date; // Timestamp of record creation
  updated_at: Date; // Timestamp of last update
}
```

### Foreign Key Constraints

- `critic_id` references `critics(critic_id)`
- `movie_id` references `movies(movie_id)`

### Sample Record

```json
{
  "review_id": 1,
  "content": "A masterful film that expertly balances...",
  "score": 4,
  "movie_id": 1,
  "critic_id": 4,
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```

`
