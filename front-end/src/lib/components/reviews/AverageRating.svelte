<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import type { Review } from "$lib/types/api";

  let {
    reviews = [],
    showCount = false,
    optimisticReviewId,
    optimisticScore
  }: {
    reviews?: Review[];
    showCount?: boolean;
    optimisticReviewId?: number;
    optimisticScore?: number;
  } = $props();

  let rating = $derived.by((): number | "N/A" => {
    if (reviews.length === 0) return "N/A";

    const total = reviews.reduce((sum, review) => {
      const scoreToUse = review.review_id === optimisticReviewId ? optimisticScore : review.score;
      const validScore = Math.min(Math.max(scoreToUse ?? review.score, 1), 5);
      return sum + validScore;
    }, 0);

    return Number((total / reviews.length).toFixed(1));
  });
</script>

<div class="flex items-center gap-2">
  <span class={`font-medium ${$theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
    Average Rating:
  </span>
  <span
    data-testid="average-rating"
    class={`rounded-full px-3 py-1 text-sm font-medium ${
      rating === "N/A"
        ? $theme === "dark"
          ? "bg-gray-800 text-gray-400"
          : "bg-gray-100 text-gray-600"
        : $theme === "dark"
          ? "bg-primary-900/20 text-primary-300"
          : "bg-primary-100 text-primary-800"
    }`}
  >
    {rating}
  </span>
  {#if showCount}
    <span class={$theme === "dark" ? "text-sm text-gray-400" : "text-sm text-gray-500"}>
      ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
    </span>
  {/if}
</div>
