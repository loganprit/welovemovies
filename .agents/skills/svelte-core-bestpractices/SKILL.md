---
name: svelte-core-bestpractices
description: Apply Svelte 5 guidance when authoring or reviewing components that use runes, events, snippets, context, or component styling.
---

## Reactivity

- Use `$state` only for values that drive a template, `$derived` for computed
  values, and `$effect` only for external synchronization. Do not update state
  from an effect when an expression or event handler is enough.
- Treat `$props` as changing; derive values that depend on them.
- Use `$inspect` while debugging reactive dependencies; see
  [the reference](references/$inspect.md).

## Components

- Use event attributes such as `onclick`; use `<svelte:window>` or
  `<svelte:document>` for global listeners instead of `onMount` or an effect.
- Prefer snippets and `{@render ...}` for reusable markup; see
  [snippets](references/snippet.md) and [rendering](references/@render.md).
- Prefer keyed each blocks with a stable unique key; see
  [each blocks](references/each.md).
- Use `createContext` for shared state scoped to a component tree.

## Styling and integrations

- Use CSS custom properties when a parent needs to style a child component.
- Use attachments for DOM or library integration; see
  [attachments](references/@attach.md).
- Use function bindings when validation or transformation belongs at the
  binding boundary; see [bindings](references/bind.md).

## Compatibility

Use runes mode and current event/snippet APIs for new code. Avoid legacy
`$:` statements, `export let`, `on:click`, slots, dynamic component tags,
`use:action`, and `class:` directives unless compatibility with existing code
requires them. Read the relevant reference before using newer features; async
expressions and `hydratable` require the experimental async setting (see
[await expressions](references/await-expressions.md) and
[hydratable](references/hydratable.md)).
