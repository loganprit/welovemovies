<script lang="ts">
  import { resolve } from "$app/paths";
  import ProgressiveImage from "$lib/components/ProgressiveImage.svelte";
  import { theme } from "$lib/stores/theme";
  import type { Theater } from "$lib/types/api";

  let {
    theater,
    variant = "detailed",
  }: { theater: Theater; variant?: "detailed" | "simple" } = $props();
</script>

{#snippet addressBlock()}
  <address
    class={`not-italic ${$theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
  >
    {theater.address_line_1}<br />
    {#if theater.address_line_2}
      {theater.address_line_2}<br />
    {/if}
    {theater.city}, {theater.state}
    {theater.zip}
  </address>
{/snippet}

{#if variant === "simple"}
  <article
    class={`rounded-lg border shadow-sm transition-shadow hover:shadow-md ${$theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
  >
    <div class="p-6">
      <h5
        class={`mb-4 text-xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        {theater.name}
      </h5>
      {@render addressBlock()}
    </div>
  </article>
{:else}
  <article
    class={`rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md ${$theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
  >
    <div class="flex flex-col gap-8 lg:flex-row">
      <aside class="lg:w-1/3">
        <h2
          class={`mb-4 text-2xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          {theater.name}
        </h2>
        {@render addressBlock()}
      </aside>

      <section class="lg:w-2/3">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {#each theater.movies ?? [] as movie (movie.movie_id)}
            <div class="group relative aspect-[2/3]">
              <a
                href={resolve(`/movies/${movie.movie_id}`)}
                class="block h-full w-full"
                aria-label={`View details for ${movie.title}`}
              >
                <ProgressiveImage
                  src={movie.image_url}
                  alt={`${movie.title} Poster`}
                  class="h-full w-full rounded-lg object-cover shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md"
                />
                <div
                  class={`absolute inset-0 rounded-lg transition-opacity duration-200 ${$theme === "dark" ? "bg-black bg-opacity-0 group-hover:bg-opacity-20" : "bg-black bg-opacity-0 group-hover:bg-opacity-10"}`}
                ></div>
              </a>
            </div>
          {/each}
        </div>
      </section>
    </div>
  </article>
{/if}
