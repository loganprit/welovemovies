<script lang="ts">
  import { theme } from "$lib/stores/theme";
</script>

<button
  onclick={() => theme.toggle()}
  class={`rounded-lg p-2 transition-colors ${
    $theme === "dark"
      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`}
  aria-label={`Switch to ${$theme === "light" ? "dark" : "light"} mode`}
>
  {#if $theme === "light"}
    <svg
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
      />
    </svg>
  {:else}
    <svg
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707"
      />
    </svg>
  {/if}
</button>
