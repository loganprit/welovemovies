<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import type { Review } from "$lib/types/api";

  let {
    review,
    deleteReview,
    setReviewScore
  }: {
    review: Review;
    deleteReview: (review: Review) => Promise<void>;
    setReviewScore: (review: Review, score: number) => Promise<void>;
  } = $props();

  let optimisticScore = $state<number | null>(null);
  let timeoutRef: ReturnType<typeof setTimeout> | undefined;

  function updateScore(newScore: number) {
    if (timeoutRef) clearTimeout(timeoutRef);

    optimisticScore = newScore;
    timeoutRef = setTimeout(async () => {
      try {
        await setReviewScore(review, newScore);
      } catch (error) {
        optimisticScore = null;
        console.error("Failed to update score:", error);
      }
    }, 1000);
  }

  function handleIncreaseClick() {
    const newScore = (optimisticScore ?? review.score) + 1;
    if (newScore <= 5) updateScore(newScore);
  }

  function handleDecreaseClick() {
    const newScore = (optimisticScore ?? review.score) - 1;
    if (newScore >= 1) updateScore(newScore);
  }
</script>

{#if review.critic}
  <article class={`mb-6 rounded-lg border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${$theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
    <header class="mb-4">
      <h4 class={`text-lg font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {review.critic.preferred_name} {review.critic.surname}
        <span class={`ml-2 text-sm ${$theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          of {review.critic.organization_name}
        </span>
      </h4>
    </header>

    <p class={`prose prose-sm mb-4 max-w-none whitespace-pre-wrap ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
      {review.content}
    </p>

    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class={`font-medium ${$theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
          Rating:
        </span>
        <div class={`flex items-center rounded-lg px-2 py-1 ${$theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <button
            class={`px-2 py-1 transition-colors ${$theme === "dark" ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-800"}`}
            onclick={handleDecreaseClick}
            aria-label="Decrease rating"
          >
            -
          </button>
          <span class={`mx-2 font-medium ${$theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
            {optimisticScore ?? review.score}
          </span>
          <button
            class={`px-2 py-1 transition-colors ${$theme === "dark" ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-800"}`}
            onclick={handleIncreaseClick}
            aria-label="Increase rating"
          >
            +
          </button>
        </div>
      </div>

      <button
        onclick={() => deleteReview(review)}
        class={`rounded-lg px-4 py-2 text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 ${$theme === "dark" ? "bg-red-700 hover:bg-red-600 focus:ring-red-600" : "bg-red-600 hover:bg-red-700 focus:ring-red-500"}`}
        aria-label="Delete review"
      >
        Delete Review
      </button>
    </div>
  </article>
{:else}
  <div class={`rounded-lg p-4 ${$theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
    Review information unavailable
  </div>
{/if}
