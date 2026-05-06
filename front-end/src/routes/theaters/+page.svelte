<script lang="ts">
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import TheaterCard from "$lib/components/TheaterCard.svelte";
  import { listTheaters } from "$lib/data/staticData";
  import { theme } from "$lib/stores/theme";

  const theaters = listTheaters();
</script>

<svelte:head>
  <title>All Theaters | WeLoveMovies</title>
</svelte:head>

<main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h2
        class={`mb-4 text-4xl font-poppins-heading ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        All Theaters
      </h2>
      <hr class={$theme === "dark" ? "border-gray-700" : "border-gray-200"} />
    </div>

    {#if theaters.length === 0}
      <ErrorAlert error={new Error("No theaters available")} />
    {:else}
      <div class="space-y-6">
        {#each theaters as theater (theater.theater_id)}
          <TheaterCard {theater} variant="detailed" />
        {/each}
      </div>
    {/if}
  </div>
</main>
