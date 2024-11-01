## Critics Table Structure

The `critics` table stores movie critic information with the following schema:

```typescript
interface Critic {
  critic_id: number; // Primary Key, Auto-incrementing
  preferred_name: string; // Critic's preferred first name
  surname: string; // Critic's last name
  organization_name: string; // Organization the critic works for
  created_at: Date; // Timestamp of record creation
  updated_at: Date; // Timestamp of last update
}
```

### Sample Record

```json
{
  "critic_id": 1,
  "preferred_name": "Chana",
  "surname": "Gibson",
  "organization_name": "Film Frenzy",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```
