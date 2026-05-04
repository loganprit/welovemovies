<script lang="ts">
  import type { ApiError } from "$lib/types/api";

  let { error }: { error: ApiError | Error | null | undefined } = $props();
</script>

{#if error}
  <div
    class="my-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
    role="alert"
  >
    <strong class="font-bold">Error: </strong>
    <span class="block sm:inline">{error.message}</span>
  </div>
{/if}
