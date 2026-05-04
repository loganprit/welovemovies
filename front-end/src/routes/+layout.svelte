<script lang="ts">
  import { PUBLIC_CONVEX_URL } from "$env/static/public";
  import Header from "$lib/components/Header.svelte";
  import { setupConvex } from "convex-svelte";
  import "../index.css";

  setupConvex(PUBLIC_CONVEX_URL);

  let { children } = $props();
</script>

<Header />
{@render children()}
