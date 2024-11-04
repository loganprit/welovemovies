import { Knex } from "knex";
import { Theater } from "../../types/api";

type TheaterSeed = Omit<Theater, "theater_id" | "created_at" | "updated_at">;

/**
 * Seed function to populate the theaters table
 */
export async function seed(knex: Knex): Promise<void> {
  const theaters: TheaterSeed[] = [
    {
      name: "Regal City Center",
      address_line_1: "801 C St.",
      address_line_2: "",
      city: "Vancouver",
      state: "WA",
      zip: "98660",
    },
    {
      name: "Hollywood Theatre",
      address_line_1: "4122 NE Sandy Blvd.",
      address_line_2: "",
      city: "Portland",
      state: "OR",
      zip: "97212",
    },
    {
      name: "Regal Tigard",
      address_line_1: "11626 SW Pacific Hwy",
      address_line_2: "",
      city: "Tigard",
      state: "OR",
      zip: "97223",
    },
  ];

  await knex("theaters").insert(theaters);
}
