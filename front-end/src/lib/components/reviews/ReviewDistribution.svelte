<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import type { Review } from "$lib/types/api";

  let {
    reviews = [],
    optimisticReviewId,
    optimisticScore
  }: {
    reviews?: Review[];
    optimisticReviewId?: number;
    optimisticScore?: number;
  } = $props();

  let distribution = $derived.by(() => {
    const counts = new Array<number>(5).fill(0);

    for (const review of reviews) {
      const scoreToUse = review.review_id === optimisticReviewId ? optimisticScore : review.score;
      const validScore = Math.min(Math.max(scoreToUse ?? review.score, 1), 5);
      counts[validScore - 1]++;
    }

    return counts;
  });
</script>

<div class="space-y-2">
  <h4 class={`font-medium ${$theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
    Score Distribution
  </h4>
  <div class="space-y-2">
    {#each distribution.toReversed() as count, index (`${index}-${count}`)}
      <div class="flex items-center gap-2">
        <span class={`w-8 text-right text-sm ${$theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {5 - index} stars
        </span>
        <div class={`h-6 flex-1 overflow-hidden rounded-full ${$theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
          <div
            class={`h-full rounded-full transition-all duration-500 ${$theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
            style:width={`${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%`}
          ></div>
        </div>
        <span class={`w-8 text-right text-sm ${$theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {count}
        </span>
      </div>
    {/each}
  </div>
</div>
