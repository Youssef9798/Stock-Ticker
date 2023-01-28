<template>
  <div
    class="w-full py-6 px-6 flex items-center justify-between bg-gray-50 shadow-md gap-12"
  >
    <div class="flex items-center justify-center">
      <h1 class="text-3xl font-bold">
        Stock<span class="text-primary">FX</span>
      </h1>
    </div>
    <div class="w-fit px-6 flex items-center">
      <ul class="flex items-center gap-4">
        <li
          v-for="link in links"
          :key="link.name"
          class="text-base font-semibold text-secondary hover:text-primary"
        >
          <nuxt-link :to="link.link">{{ link.name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: require('~/constants/links.json'),
    }
  },
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-primary;
}
.nuxt-link-active {
  @apply text-primary;
}
</style>
