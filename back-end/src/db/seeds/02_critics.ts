import { Knex } from "knex";
import { Critic } from "../../types/api";

// Omit auto-generated fields from Critic type for seeding
type CriticSeed = Omit<Critic, "critic_id" | "created_at" | "updated_at">;

/**
 * Seed function to populate the critics table with initial data
 * @param knex - The Knex instance
 * @returns Promise that resolves when seeding is complete
 */
export async function seed(knex: Knex): Promise<void> {
  const critics: CriticSeed[] = [
    {
      preferred_name: "Chana",
      surname: "Gibson",
      organization_name: "Film Frenzy",
    },
    {
      preferred_name: "Maria",
      surname: "Cooke",
      organization_name: "The Spool",
    },
    {
      preferred_name: "Bret",
      surname: "Moss",
      organization_name: "Film Companion",
    },
    {
      preferred_name: "Alex",
      surname: "Grimes",
      organization_name: "AV Club",
    },
    {
      preferred_name: "Mel",
      surname: "Delgado",
      organization_name: "TIME Magazine",
    },
    {
      preferred_name: "Lea",
      surname: "Vetzer",
      organization_name: "London Evening Standard",
    },
    {
      preferred_name: "Abhi",
      surname: "Patil",
      organization_name: "Independent (UK)",
    },
  ];

  // Insert the critics into the database
  await knex("critics").insert(critics);
}
