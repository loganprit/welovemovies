<script lang="ts">
  import { theme } from "$lib/stores/theme";

  let { variant = "grid" }: { variant?: "grid" | "list" } = $props();
</script>

<div class={`relative ${variant === "grid" ? "p-4 sm:w-1/2 md:w-1/3 lg:w-1/4" : "w-full"}`}>
  <div class="relative aspect-[2/3] overflow-hidden rounded-lg">
    <div class={`h-full w-full animate-pulse ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
  </div>
  <div class="mt-4 space-y-2">
    <div class={`h-6 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
    <div class={`mx-auto h-4 w-1/4 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
  </div>
</div>
