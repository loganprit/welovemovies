<script lang="ts">
  import { listMovies } from "$lib/api";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import MovieDetails from "$lib/components/MovieDetails.svelte";
  import DetailedMovieSkeleton from "$lib/components/skeletons/DetailedMovieSkeleton.svelte";
  import { theme } from "$lib/stores/theme";

  const moviesPromise = listMovies();
</script>

<svelte:head>
  <title>All Movies | WeLoveMovies</title>
</svelte:head>

<main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h2 class={`mb-4 text-4xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}>
        All Movies
      </h2>
      <hr class={$theme === "dark" ? "border-gray-700" : "border-gray-200"} />
    </div>

    {#await moviesPromise}
      <section class={$theme === "dark" ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
        {#each Array.from({ length: 16 }, (_, index) => index) as item (item)}
          <DetailedMovieSkeleton />
        {/each}
      </section>
    {:then movies}
      <section class={$theme === "dark" ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
        {#each movies as movie (movie.movie_id)}
          <MovieDetails {movie} variant="list" />
        {/each}
      </section>
    {:catch error}
      <ErrorAlert {error} />
    {/await}
  </div>
</main>
