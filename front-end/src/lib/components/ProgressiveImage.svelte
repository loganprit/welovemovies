<script lang="ts">
  import { theme } from "$lib/stores/theme";

  let {
    src,
    alt,
    class: className = "",
  }: { src: string; alt: string; class?: string } = $props();
  let isLoaded = $state(false);
  let hasError = $state(false);
</script>

<div
  class={`relative overflow-hidden ${className} ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"} ${!isLoaded ? "animate-pulse" : ""}`}
>
  {#if hasError}
    <div
      class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800"
    >
      <span class="text-gray-500 dark:text-gray-400">Failed to load image</span>
    </div>
  {:else}
    <img
      {src}
      {alt}
      class={`h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      loading="lazy"
      onload={() => (isLoaded = true)}
      onerror={() => (hasError = true)}
    />
  {/if}
</div>
