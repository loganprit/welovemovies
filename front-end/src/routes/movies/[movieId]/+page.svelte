<script lang="ts">
  import { page } from "$app/state";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import MovieDetails from "$lib/components/MovieDetails.svelte";
  import ProgressiveImage from "$lib/components/ProgressiveImage.svelte";
  import ReviewList from "$lib/components/reviews/ReviewList.svelte";
  import TheaterCard from "$lib/components/TheaterCard.svelte";
  import { readMovie } from "$lib/data/staticData";
  import { theme } from "$lib/stores/theme";
  import type { Review } from "$lib/types/api";

  let movieId = $derived(Number(page.params.movieId));
  let deletedReviewIds = $state<number[]>([]);
  let reviewScores = $state<Record<number, number>>({});
  let movie = $derived(
    Number.isFinite(movieId)
      ? readMovie(movieId, { deletedReviewIds, reviewScores })
      : undefined,
  );

  function handleDeleteReview(review: Review) {
    deletedReviewIds = [...deletedReviewIds, review.review_id];
    return Promise.resolve();
  }

  function handleUpdateScore(review: Review, score: number) {
    reviewScores = { ...reviewScores, [review.review_id]: score };
    return Promise.resolve();
  }
</script>

<svelte:head>
  <title>Movie Details | WeLoveMovies</title>
</svelte:head>

{#if !movie}
  <main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
    <div class="container mx-auto px-4 py-8">
      <ErrorAlert error={new Error("Movie cannot be found")} />
    </div>
  </main>
{:else}
  <main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
    <div class="container mx-auto px-4 py-8">
      <section class="flex flex-col gap-8 lg:flex-row">
        <article class="w-full lg:w-1/4">
          <ProgressiveImage
            src={movie.image_url}
            alt={`${movie.title} Poster`}
            class="w-full rounded-lg object-cover shadow-lg"
          />
        </article>
        <aside class="flex-1 space-y-8">
          <MovieDetails {movie} variant="full" />
          <section class="mt-8">
            <h4
              class={`mb-6 text-2xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Now Showing At
            </h4>
            {#if movie.theaters?.length}
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each movie.theaters as theater (theater.theater_id)}
                  <TheaterCard {theater} variant="simple" />
                {/each}
              </div>
            {:else}
              <div
                class={`rounded-lg p-6 text-center ${$theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}
              >
                No theaters available
              </div>
            {/if}
          </section>
          <ReviewList
            reviews={movie.reviews}
            deleteReview={handleDeleteReview}
            setReviewScore={handleUpdateScore}
          />
        </aside>
      </section>
    </div>
  </main>
{/if}
