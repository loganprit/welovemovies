<script lang="ts">
  import { theme } from "$lib/stores/theme";
</script>

<section class="mt-8">
  <div
    class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
  >
    <div
      class={`h-8 w-32 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
    ></div>
    <div class="flex items-center gap-2">
      <div
        class={`h-8 w-36 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
      ></div>
      <div
        class={`h-8 w-24 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"}`}
      ></div>
    </div>
  </div>
  <div class="mb-8">
    <div
      class={`mb-4 h-6 w-40 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
    ></div>
    <div class="space-y-2">
      {#each [0, 1, 2, 3, 4] as item (item)}
        <div class="flex items-center gap-4">
          <div
            class={`h-6 w-16 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
          ></div>
          <div
            class={`h-6 flex-1 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/70"}`}
          ></div>
          <div
            class={`h-6 w-8 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
          ></div>
        </div>
      {/each}
    </div>
  </div>
  <div class="space-y-6">
    {#each [0, 1, 2] as item (item)}
      <div
        class={`rounded-lg p-6 ${$theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div class="space-y-4">
          <div
            class={`h-6 w-48 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
          ></div>
          <div
            class={`h-4 w-32 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
          ></div>
          <div class="space-y-2">
            <div
              class={`h-4 w-full animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
            ></div>
            <div
              class={`h-4 w-5/6 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
            ></div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
