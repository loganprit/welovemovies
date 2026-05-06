<script lang="ts">
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import MovieCard from "$lib/components/MovieCard.svelte";
  import { listMovies } from "$lib/data/staticData";
  import { theme } from "$lib/stores/theme";

  const movies = listMovies({ isShowing: true });
</script>

<svelte:head>
  <title>Now Showing | WeLoveMovies</title>
</svelte:head>

<main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h2
        class={`mb-4 text-4xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Now Showing
      </h2>
      <hr class={$theme === "dark" ? "border-gray-700" : "border-gray-200"} />
    </div>

    {#if movies.length === 0}
      <ErrorAlert error={new Error("No movies available")} />
    {:else}
      <section class="-mx-4 flex flex-wrap">
        {#each movies as movie (movie.movie_id)}
          <MovieCard {movie} variant="grid" />
        {/each}
      </section>
    {/if}
  </div>
</main>
