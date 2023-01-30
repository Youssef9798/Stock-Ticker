<template>
  <div class="flex flex-col w-full">
    <LayoutHeader />
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('stocks/getStock', { symbol: 'MSFT' })
    this.$store.dispatch('fx/getFx', { symbol: 'EGPUSD' })
  },
}
</script>
