<script lang="ts">
  import { resolve } from "$app/paths";
  import { prefetchMovie } from "$lib/api";
  import { theme } from "$lib/stores/theme";
  import type { Movie } from "$lib/types/api";

  let { movie, variant = "list" }: { movie: Movie; variant?: "list" | "full" } = $props();
  let isList = $derived(variant === "list");

  function handleMouseEnter() {
    prefetchMovie(movie.movie_id);
  }
</script>

<section
  class={isList
    ? `flex flex-col gap-8 border-b py-8 transition-colors duration-200 md:flex-row ${$theme === "dark" ? "border-gray-700 hover:bg-gray-800/50" : "border-gray-200 hover:bg-gray-50"}`
    : "space-y-4"}
>
  {#if isList}
    <article class="w-full flex-shrink-0 md:w-1/4">
      <img
        alt={`${movie.title} Poster`}
        class="h-[400px] w-full rounded-lg object-cover shadow-lg transition-shadow duration-200 hover:shadow-xl"
        src={movie.image_url}
        loading="lazy"
      />
    </article>
  {/if}
  <div class="flex-1 space-y-6">
    <h3 class={`${isList ? "text-3xl font-bold tracking-tight" : "font-poppins-heading text-3xl"} ${$theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {movie.title}
    </h3>
    <p class={`${isList ? "" : "leading-relaxed"} ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
      {movie.description}
    </p>
    <div class="space-y-3">
      <p class={`flex items-center gap-2 ${$theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
        <span class="font-medium">Runtime:</span>
        <span class={`rounded-full px-3 py-1 ${$theme === "dark" ? "bg-primary-900/20 text-primary-300" : "bg-primary-50 text-primary-700"}`}>
          {movie.runtime_in_minutes} minutes
        </span>
      </p>
      <p class={`flex items-center gap-2 ${$theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
        <span class="font-medium">Rating:</span>
        <span class={`rounded-full px-3 py-1 ${$theme === "dark" ? "bg-primary-900/20 text-primary-300" : "bg-primary-50 text-primary-700"}`}>
          {movie.rating}
        </span>
      </p>
    </div>
    {#if isList}
      <a
        href={resolve(`/movies/${movie.movie_id}`)}
        class={`inline-block rounded-lg px-6 py-3 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          $theme === "dark" ? "bg-primary-500 text-gray-100 hover:bg-primary-400 hover:text-white" : "bg-primary-600 text-black hover:bg-primary-700 hover:text-gray-900"
        }`}
        aria-label={`See more details about ${movie.title}`}
        onmouseenter={handleMouseEnter}
        onfocus={handleMouseEnter}
      >
        See More
      </a>
    {/if}
  </div>
</section>
