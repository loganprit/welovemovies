<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import headerImage from "$lib/assets/header.jpg";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  type NavHref = "/" | "/movies" | "/theaters";

  const navItems = [
    {
      href: "/",
      label: "Home",
      ariaLabel: "View now showing movies",
      mobileOnly: true,
    },
    { href: "/movies", label: "All Movies", ariaLabel: "View all movies" },
    {
      href: "/theaters",
      label: "All Theaters",
      ariaLabel: "View all theaters",
    },
  ] satisfies Array<{
    href: NavHref;
    label: string;
    ariaLabel: string;
    mobileOnly?: boolean;
  }>;

  const activeSection = $derived.by(() => {
    const routeId = page.route.id ?? page.url.pathname;

    if (routeId === "/") return "/";
    if (routeId.startsWith("/movies")) return "/movies";
    if (routeId.startsWith("/theaters")) return "/theaters";

    return null;
  });

  const linkBaseClass =
    "rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-200 sm:text-base";
  const inactiveLinkClass =
    "text-white hover:bg-white/10 hover:text-primary-200";
  const activeLinkClass = "bg-white/15 text-primary-100 ring-1 ring-white/25";

  const isActive = (href: NavHref) => activeSection === href;
</script>

<header
  class="relative border-b border-gray-800 text-white"
  style={`background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${headerImage}); background-position: center; background-size: cover;`}
>
  <div class="container mx-auto px-6">
    <div class="flex items-center justify-between gap-4">
      <nav class="min-w-0 py-6" aria-label="Main navigation">
        <ul class="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6">
          <li class="hidden lg:block">
            <a
              class={[
                "rounded-md px-1 py-2 font-poppins-heading text-white transition-colors hover:text-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-200",
                isActive("/") &&
                  "text-primary-100 underline decoration-primary-200 decoration-2 underline-offset-8",
              ]}
              href={resolve("/")}
              aria-current={isActive("/") ? "page" : undefined}
              aria-label="Home"
            >
              <h1 class="text-2xl italic">WeLoveMovies</h1>
            </a>
          </li>
          {#each navItems as item (item.href)}
            <li class={item.mobileOnly ? "lg:hidden" : undefined}>
              <a
                class={[
                  linkBaseClass,
                  isActive(item.href) ? activeLinkClass : inactiveLinkClass,
                ]}
                href={resolve(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                aria-label={item.ariaLabel}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
      <ThemeToggle />
    </div>
    <div class="py-12">
      <h1
        class="mb-4 text-5xl font-poppins-heading tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
      >
        Find your next favorite movie!
      </h1>
      <p class="text-2xl font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
        <em class="font-medium">WeLoveMovies</em> is your source for finding reviews
        of movies in theaters near you.
      </p>
    </div>
  </div>
</header>
