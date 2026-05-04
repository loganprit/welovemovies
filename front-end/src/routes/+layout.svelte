<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import "../index.css";

  let { children } = $props();
</script>

<Header />
{@render children()}
