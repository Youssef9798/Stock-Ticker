<template>
  <div
    class="grid w-full grid-cols-2 border border-gray-100 rounded-lg shadow-sm group"
  >
    <div
      class="relative flex items-center col-span-3 px-4 py-2"
      v-on-clickaway="closeMenu"
    >
      <div
        class="absolute flex items-center cursor-pointer top-1 right-4"
        @click="optionsMenu = !optionsMenu"
      >
        <IconsDotsIcon class="w-6 h-6 text-gray-200" />
      </div>
      <div
        class="min-w-[150px] flex flex-col bg-white z-30 border border-gray-100 shadow-sm rounded absolute top-8 right-0"
        v-if="optionsMenu"
      >
        <button
          class="flex items-center w-full gap-2 px-4 py-2 text-xs font-semibold text-red-400 transition-all duration-300 border-0 outline-none hover:pl-6 hover:bg-red-50/20"
          @click="
            type == 'stocks'
              ? $store.commit('stocks/deleteStock', item)
              : $store.commit('fx/deleteFx', item),
              (optionsMenu = false)
          "
        >
          <IconsDeleteIcon class="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-start gap-2 px-4 py-4">
      <div
        class="flex items-center justify-center px-2 py-2 text-2xl font-semibold text-gray-500 rounded bg-gray-50"
        :class="{
          '!text-green-400 !bg-green-50':
            item.results &&
            item.results[0] &&
            item.results[0].c >= item.results[0].o,
          '!text-red-400 !bg-red-50':
            item.results &&
            item.results[0] &&
            item.results[0].c < item.results[0].o,
        }"
      >
        {{ item.results && item.results[0] ? item.results[0].c : 'N/A' }}
      </div>
      <h1 class="text-2xl font-bold text-secondary">
        {{
          item && item.ticker
            ? type === 'stocks'
              ? item.ticker
              : item.ticker
            : 'N/A'
        }}
      </h1>
    </div>
    <div class="flex flex-col px-2 py-4">
      <p class="text-sm font-normal text-gray-600 capitalize">
        Open:
        <span class="font-semibold">{{
          item.results && item.results[0] ? item.results[0].o : 'N/A'
        }}</span>
      </p>
      <p class="text-sm font-normal text-gray-600 capitalize">
        Close:
        <span class="font-semibold">{{
          item.results && item.results[0] ? item.results[0].c : 'N/A'
        }}</span>
      </p>
      <p class="text-sm font-normal text-gray-600 capitalize">
        high:
        <span class="font-semibold">{{
          item.results && item.results[0] ? item.results[0].h : 'N/A'
        }}</span>
      </p>
      <p class="text-sm font-normal text-gray-600 capitalize">
        low:
        <span class="font-semibold">{{
          item.results && item.results[0] ? item.results[0].l : 'N/A'
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'stocks',
    },
  },
  data() {
    return {
      optionsMenu: false,
    }
  },
  methods: {
    closeMenu() {
      this.optionsMenu = false
    },
  },
}
</script>
