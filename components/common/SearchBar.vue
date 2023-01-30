<template>
  <div
    class="relative flex items-center ml-auto border border-gray-200 rounded-md w-fit"
    v-on-clickaway="closeMenu"
  >
    <input
      type="text"
      class="w-full h-full px-4 py-2 text-sm placeholder-gray-400 bg-transparent border-0 outline-none focus:outline-none text-secondary"
      placeholder="add your stock here"
      v-model="symbol"
      @focus="searchResultsMenu = true"
      @input="onSearchItems"
    />
    <button
      class="h-full px-4 py-3 text-white transition-all duration-300 border-0 outline-none bg-primary rounded-r-md hover:bg-opacity-80"
      :class="{
        'pointer-events-none !bg-gray-200 !text-gray-400': symbol.length == 0,
      }"
      type="button"
      @click="addItem"
      @keydown.enter="addItem"
    >
      <IconsAddIcon class="w-4 h-4" />
    </button>
    <div
      class="w-full absolute right-0 bg-white rounded-b-md max-h-[300px] overflow-y-auto border-gray-200 border shadow-md top-full flex flex-col z-40"
      v-if="searchResultsMenu && symbol"
    >
      <div
        v-for="(item, i) in searchedItems"
        class="grid w-full grid-cols-2 px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0 text-secondary"
        :key="`search-${item.symbol}-${i}`"
        @click=";(symbol = item.ticker), (searchResultsMenu = false)"
      >
        <div class="text-xs font-semibold">{{ item.ticker }}</div>
        <div class="flex items-center w-full text-xs font-normal text-ellipsis">
          <p class="overflow-hidden text-ellipsis whitespace-nowrap">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    type: {
      type: String,
      default: 'stocks',
    },
  },
  data() {
    return {
      searchResultsMenu: false,
      symbol: '',
      searchedItems: [],
    }
  },
  methods: {
    onSearchItems: debounce(async function () {
      let items
      if (this.type === 'stocks') {
        items = await this.$axios.get(
          `/v3/reference/tickers?market=stocks&search=${this.symbol?.toUpperCase()}&apiKey=9zbK2A8mE5tbYEEFPjQm1ifaTWoHFPvw`
        )
      }
      this.searchedItems = items?.data?.results
      if (this.searchedItems && this.searchedItems.length > 0) {
        this.searchResultsMenu = true
      } else {
        this.searchResultsMenu = false
      }
    }, 500),
    addItem() {
      if (this.symbol) {
        this.$emit('addItem', this.symbol)
      }
    },
    closeMenu() {
      this.searchResultsMenu = false
    },
  },
}
</script>
