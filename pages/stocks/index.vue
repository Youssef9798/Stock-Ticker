<template>
  <div class="flex flex-col w-full min-h-screen gap-8 p-5">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-semibold text-secondary">Stocks</h1>
      <div
        class="flex items-center justify-center px-4 py-4 text-sm text-yellow-400 rounded-lg bg-yellow-50"
      >
        All results are updated according to (4:00am to 8:00pm) Eastern Time for
        the US market every 5 minute
      </div>
      <CommonSearchBar @addItem="addStock" :type="'stocks'" />
    </div>
    <div class="w-full min-h-[350px]">
      <div
        class="flex items-center justify-center w-full h-full min-h-[350px] bg-white"
        v-if="loading"
      >
        <IconsLoadingIcon class="w-14 h-14 text-primary" />
      </div>
      <apexcharts
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
        v-if="!loading"
      ></apexcharts>
    </div>
    <transition-group
      tag="div"
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-left"
      mode="out-in"
      class="grid grid-cols-4 gap-4"
    >
      <CommonStockCard
        v-for="(stock, i) in stocks"
        :key="`s-${i}`"
        :stock="stock"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  created() {
    this.addStock('MSFT')
  },
  data() {
    return {
      loading: false,
      series: [
        {
          name: 'Close',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        markers: {
          size: 5,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Stocks Close Price',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
  computed: {
    stocks() {
      return this.$store.state.stocks.stocks
    },
  },
  watch: {
    stocks(newVal) {
      this.setChartData()
    },
  },
  methods: {
    async addStock(value) {
      this.loading = true
      let payload = {
        symbol: value?.toUpperCase(),
      }
      await this.$store.dispatch('stocks/getStock', payload)
      this.setChartData()
      this.loading = false
    },
    async setChartData() {
      this.loading = true
      this.chartOptions.xaxis.categories = []
      this.series[0].data = []
      await this.stocks.map((el) => {
        this.chartOptions.xaxis.categories.push(el.ticker)
        if (el && el.results && el.results[0]) {
          this.series[0].data.push(el.results[0].c)
        }
      })
      this.loading = false
    },
  },
}
</script>
