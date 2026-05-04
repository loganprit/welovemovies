import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (!browser) return "light";

  const saved = window.localStorage.getItem("theme") as Theme | null;
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  subscribe((theme) => {
    if (!browser) return;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  });

  return {
    subscribe,
    set,
    toggle: () => update((theme) => (theme === "light" ? "dark" : "light")),
  };
}

export const theme = createThemeStore();
