<script lang="ts">
  import { theme } from "$lib/stores/theme";
</script>

<article class={`rounded-lg border p-6 shadow-sm ${$theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
  <div class="flex flex-col gap-8 lg:flex-row">
    <aside class="lg:w-1/3">
      <div class={`mb-4 h-8 w-3/4 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
      <div class="space-y-2">
        <div class={`h-4 w-full animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
        <div class={`h-4 w-2/3 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
        <div class={`h-4 w-1/2 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
      </div>
    </aside>

    <section class="lg:w-2/3">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {#each [0, 1, 2, 3, 4, 5] as item (item)}
          <div class="relative aspect-[2/3]">
            <div class={`h-full w-full animate-pulse rounded-lg ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</article>
