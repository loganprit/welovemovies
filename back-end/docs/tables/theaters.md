## Theaters Table Structure

The `theaters` table stores theater information with the following schema:

```typescript
interface Theater {
  theater_id: number; // Primary Key, Auto-incrementing
  name: string; // Theater name
  address_line_1: string; // Primary address
  address_line_2?: string; // Optional secondary address
  city: string; // Theater city
  state: string; // Theater state
  zip: string; // Theater ZIP code
  created_at: Date; // Timestamp of record creation
  updated_at: Date; // Timestamp of last update
}
```

### Sample Record

```json
{
  "theater_id": 1,
  "name": "Hollywood Theatre",
  "address_line_1": "4122 NE Sandy Blvd.",
  "address_line_2": "",
  "city": "Portland",
  "state": "OR",
  "zip": "97212",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```
