<script lang="ts">
  import { listTheaters } from "$lib/api";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import TheaterCard from "$lib/components/TheaterCard.svelte";
  import TheaterCardSkeleton from "$lib/components/skeletons/TheaterCardSkeleton.svelte";
  import { theme } from "$lib/stores/theme";

  const theatersPromise = listTheaters();
</script>

<svelte:head>
  <title>All Theaters | WeLoveMovies</title>
</svelte:head>

<main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h2 class={`mb-4 text-4xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}>
        All Theaters
      </h2>
      <hr class={$theme === "dark" ? "border-gray-700" : "border-gray-200"} />
    </div>

    {#await theatersPromise}
      <div class="space-y-6">
        {#each [0, 1, 2, 3] as item (item)}
          <TheaterCardSkeleton />
        {/each}
      </div>
    {:then theaters}
      {#if theaters.length === 0}
        <div class={`rounded-lg p-6 text-center ${$theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
          No theaters available
        </div>
      {:else}
        <div class="space-y-6">
          {#each theaters as theater (theater.theater_id)}
            <TheaterCard {theater} variant="detailed" />
          {/each}
        </div>
      {/if}
    {:catch error}
      <ErrorAlert {error} />
    {/await}
  </div>
</main>
