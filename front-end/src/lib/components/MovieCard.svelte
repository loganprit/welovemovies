<script lang="ts">
  import { resolve } from "$app/paths";
  import ProgressiveImage from "$lib/components/ProgressiveImage.svelte";
  import { theme } from "$lib/stores/theme";
  import type { Movie } from "$lib/types/api";

  let { movie, variant = "grid" }: { movie: Movie; variant?: "grid" | "list" } =
    $props();
</script>

<article
  class={`relative group ${variant === "grid" ? "p-4 sm:w-1/2 md:w-1/3 lg:w-1/4" : "w-full"}`}
>
  <div class="relative aspect-[2/3] overflow-hidden rounded-lg">
    <ProgressiveImage
      src={movie.image_url}
      alt={`${movie.title} Poster`}
      class="h-full w-full rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105"
    />
    <div
      class={`absolute inset-0 transition-opacity duration-200 ${$theme === "dark" ? "bg-black bg-opacity-0 group-hover:bg-opacity-20" : "bg-black bg-opacity-0 group-hover:bg-opacity-10"}`}
    ></div>
    <a
      href={resolve(`/movies/${movie.movie_id}`)}
      class="absolute inset-0 z-10"
      aria-label={`View details for ${movie.title}`}
    >
      <span class="sr-only">View details</span>
    </a>
  </div>
  <div class="mt-4 space-y-2">
    <h3
      class={`text-center text-lg font-poppins-heading transition-colors duration-200 group-hover:text-primary-500 ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
    >
      {movie.title}
    </h3>
    {#if movie.rating}
      <p
        class={`text-center text-sm ${$theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
      >
        {movie.rating}
      </p>
    {/if}
  </div>
</article>
