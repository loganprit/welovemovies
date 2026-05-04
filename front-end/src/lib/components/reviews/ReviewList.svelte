<script lang="ts">
  import AverageRating from "$lib/components/reviews/AverageRating.svelte";
  import ReviewDistribution from "$lib/components/reviews/ReviewDistribution.svelte";
  import SingleReview from "$lib/components/reviews/SingleReview.svelte";
  import { theme } from "$lib/stores/theme";
  import type { Review } from "$lib/types/api";

  let {
    reviews = [],
    deleteReview,
    setReviewScore,
  }: {
    reviews?: Review[];
    deleteReview: (review: Review) => Promise<void>;
    setReviewScore: (review: Review, score: number) => Promise<void>;
  } = $props();

  let optimisticReviewId = $state<number | undefined>(undefined);
  let optimisticScore = $state<number | undefined>(undefined);
  let sortedReviews = $derived(
    [...reviews].sort((leftReview, rightReview) => {
      if (!leftReview.critic || !rightReview.critic) return 0;
      return leftReview.critic.preferred_name.localeCompare(
        rightReview.critic.preferred_name,
      );
    }),
  );

  async function handleScoreUpdate(review: Review, score: number) {
    optimisticReviewId = review.review_id;
    optimisticScore = score;
    await setReviewScore(review, score);
    optimisticReviewId = undefined;
    optimisticScore = undefined;
  }
</script>

{#if reviews.length === 0}
  <div
    class={`py-8 text-center ${$theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
  >
    No reviews yet
  </div>
{:else}
  <section class="mt-8">
    <div
      class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
    >
      <h3
        class={`text-2xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Reviews
      </h3>
      <AverageRating
        {reviews}
        showCount
        {optimisticReviewId}
        {optimisticScore}
      />
    </div>
    <div class="mb-8">
      <ReviewDistribution {reviews} {optimisticReviewId} {optimisticScore} />
    </div>
    <div class="space-y-6">
      {#each sortedReviews as review (review.review_id)}
        <SingleReview
          {review}
          {deleteReview}
          setReviewScore={handleScoreUpdate}
        />
      {/each}
    </div>
  </section>
{/if}
