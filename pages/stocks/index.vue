<template>
  <div class="w-full min-h-screen flex flex-col gap-2 p-5">
    <div class="flex items-center">
      <h1 class="text-2xl font-semibold text-secondary">Stocks</h1>
      <div
        class="ml-auto flex items-center w-fit rounded-md border border-gray-200 relative"
      >
        <input
          type="text"
          class="w-full border-0 outline-none px-4 py-2 focus:outline-none bg-transparent text-sm text-secondary placeholder-gray-400 h-full"
          placeholder="add your stock here"
          v-model="stockSymbol"
          @input="onSearchStocks"
        />
        <button
          class="border-0 outline-none h-full bg-primary px-4 py-3 text-white rounded-r-md hover:bg-opacity-80 duration-300 transition-all"
          :class="{
            'pointer-events-none !bg-gray-200 !text-gray-400':
              stockSymbol.length == 0,
          }"
          type="button"
          @click="addStock"
          @keydown.enter="addStock"
        >
          <IconsAddIcon class="w-4 h-4" />
        </button>
        <div
          class="w-full absolute right-0 bg-white rounded-b-md border-gray-200 border shadow-md top-full flex flex-col"
          v-if="searchResultsMenu && stockSymbol"
        >
          <div
            v-for="(stock, i) in searchedStocks"
            class="w-full py-2 border-b gap-4 cursor-pointer last:border-b-0 justify-between border-gray-200 px-4 text-secondary flex items-center"
            :key="`search-${stock[`2. name`]}-${i}`"
            @click="stockSymbol = stock[`1. symbol`]"
          >
            <p class="font-semibold text-xs">{{ stock[`1. symbol`] }}</p>
            <p class="font-normal text-xs w-fit">
              {{ stock[`2. name`].substring(0, 15) + '...' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition-group
      tag="div"
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-left"
      mode="out-in"
      class="grid grid-cols-4 gap-4"
    >
      <div
        class="w-full flex flex-col"
        v-for="(stock, i) in stocks"
        :key="`s-${i}`"
      >
        {{ stock }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      searchResultsMenu: false,
      stockSymbol: '',
      searchedStocks: [],
    }
  },
  computed: {
    stocks() {
      return this.$store.state.stocks.stocks
    },
  },
  methods: {
    onSearchStocks: debounce(async function () {
      let stocks = await this.$axios.get(
        `/query?function=SYMBOL_SEARCH&keywords=${this.stockSymbol}&apikey=L5KQWE5QR8YZYR4R`
      )
      this.searchedStocks = stocks?.data?.bestMatches
      if (this.searchedStocks && this.searchedStocks.length > 0) {
        this.searchResultsMenu = true
      } else {
        this.searchResultsMenu = false
      }
    }, 500),
    addStock() {
      if (this.stockSymbol) {
        let payload = {
          symbol: this.stockSymbol,
          hasInterval: true,
        }

        this.$store.dispatch('stocks/getStock', payload)
      }
    },
  },
}
</script>
