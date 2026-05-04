<script lang="ts">
  import { resolve } from "$app/paths";
  import headerImage from "$lib/assets/header.jpg";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
</script>

<header
  class="relative border-b border-gray-800 text-white"
  style={`background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${headerImage}); background-position: center; background-size: cover;`}
>
  <div class="container mx-auto px-6">
    <div class="flex items-center justify-between">
      <nav class="py-6" aria-label="Main navigation">
        <ul class="flex items-center space-x-8">
          <li class="hidden lg:block">
            <a class="font-poppins-heading text-white transition-colors hover:text-primary-200" href={resolve("/")} aria-label="Home">
              <h1 class="text-2xl italic">WeLoveMovies</h1>
            </a>
          </li>
          <li>
            <a class="text-lg text-white transition-colors hover:text-primary-200" href={resolve("/movies")} aria-label="View all movies">
              All Movies
            </a>
          </li>
          <li>
            <a class="text-lg text-white transition-colors hover:text-primary-200" href={resolve("/theaters")} aria-label="View all theaters">
              All Theaters
            </a>
          </li>
        </ul>
      </nav>
      <ThemeToggle />
    </div>
    <div class="py-12">
      <h1 class="mb-4 text-5xl font-poppins-heading tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        Find your next favorite movie!
      </h1>
      <p class="text-2xl font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
        <em class="font-medium">WeLoveMovies</em> is your source for finding reviews of movies in theaters near you.
      </p>
    </div>
  </div>
</header>
