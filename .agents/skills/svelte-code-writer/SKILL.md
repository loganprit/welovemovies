---
name: svelte-code-writer
description: Look up Svelte 5 documentation or run the Svelte autofixer when syntax is uncertain or Svelte-specific diagnostics are needed.
---

# Svelte 5 Code Writer

Use this skill for Svelte-specific lookup and diagnostics. Use
`svelte-core-bestpractices` for general Svelte guidance; this tool skill does
not need to run for every Svelte edit.

Run the CLI from this Bun project with `bunx @sveltejs/mcp ...`:

```bash
bunx @sveltejs/mcp list-sections
bunx @sveltejs/mcp get-documentation "<section1>,<section2>,..."
bunx @sveltejs/mcp svelte-autofixer "<code_or_path>" [options]
```

Use documentation lookup when syntax is uncertain, then run the autofixer for
the relevant changed component when Svelte diagnostics are part of the task.
Use `--async` or `--svelte-version 4|5` only when the file requires that mode.
When passing inline runes through the shell, escape `$` (for example `\$state`).
