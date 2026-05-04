<script lang="ts">
  import ReviewListSkeleton from "$lib/components/skeletons/ReviewListSkeleton.svelte";
  import { theme } from "$lib/stores/theme";

  let { variant = "list" }: { variant?: "list" | "full" } = $props();
</script>

{#if variant === "full"}
  <main class={$theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
    <div class="container mx-auto px-4 py-8">
      <section class="flex flex-col gap-8 lg:flex-row">
        <article class="w-full lg:w-1/4">
          <div class={`aspect-[2/3] w-full animate-pulse rounded-lg shadow-lg ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
        </article>
        <aside class="flex-1 space-y-8">
          <div class="space-y-6">
            <div class={`h-10 w-2/3 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
            <div class="space-y-2">
              <div class={`h-4 w-full animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
              <div class={`h-4 w-11/12 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
              <div class={`h-4 w-4/5 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <div class={`h-6 w-20 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
                <div class={`h-6 w-32 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"}`}></div>
              </div>
              <div class="flex items-center gap-2">
                <div class={`h-6 w-16 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
                <div class={`h-6 w-24 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"}`}></div>
              </div>
            </div>
          </div>

          <section class="mt-8">
            <div class={`mb-6 h-8 w-48 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each [0, 1, 2] as item (item)}
                <div class={`rounded-lg border p-6 ${$theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                  <div class="space-y-4">
                    <div class={`h-6 w-3/4 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    <div class="space-y-2">
                      <div class={`h-4 w-full animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
                      <div class={`h-4 w-2/3 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </section>
          <ReviewListSkeleton />
        </aside>
      </section>
    </div>
  </main>
{:else}
  <div class={`flex flex-col gap-8 border-b py-8 md:flex-row ${$theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
    <div class={`h-[400px] w-full flex-shrink-0 animate-pulse rounded-lg md:w-1/4 ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
    <div class="flex-1 space-y-6">
      <div class={`h-9 w-2/3 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
      <div class="space-y-2">
        <div class={`h-4 w-full animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
        <div class={`h-4 w-10/12 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
        <div class={`h-4 w-8/12 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
      </div>
      <div class={`h-10 w-28 animate-pulse rounded ${$theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}></div>
    </div>
  </div>
{/if}
