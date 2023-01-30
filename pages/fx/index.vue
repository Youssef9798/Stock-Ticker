<template>
  <div class="flex flex-col w-full min-h-screen gap-8 p-5">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-semibold text-secondary">FX Currencies</h1>
      <div
        class="flex items-center justify-center px-4 py-4 text-sm text-yellow-400 rounded-lg bg-yellow-50"
      >
        All results are updated according to (4:00am to 8:00pm) Eastern Time for
        the US market every 5 minute
      </div>
      <div class="relative flex items-center gap-2 ml-auto w-fit">
        <input
          type="text"
          class="w-full h-full px-4 py-2 text-sm placeholder-gray-400 bg-transparent border border-gray-200 rounded-md outline-none focus:outline-none text-secondary"
          placeholder="ex: EUR"
          v-model="firstCurrency"
        />
        <div class="flex items-center">
          <IconsSlashIcon class="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          class="w-full h-full px-4 py-2 text-sm placeholder-gray-400 bg-transparent border border-gray-200 rounded-md outline-none focus:outline-none text-secondary"
          placeholder="ex: EGP"
          v-model="secondCurrency"
        />
        <button
          class="h-full px-4 py-2 text-white transition-all duration-300 border-0 rounded-md outline-none bg-primary hover:bg-opacity-80"
          :class="{
            'pointer-events-none !bg-gray-200 !text-gray-400':
              firstCurrency.length == 0 || secondCurrency.length == 0,
          }"
          type="button"
          @click="addFx"
          @keydown.enter="addFx"
        >
          <IconsAddIcon class="w-4 h-4" />
        </button>
      </div>
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
      <CommonStatCard
        :type="'fx'"
        v-for="(fx, i) in fxs"
        :key="`s-${i}`"
        :item="fx"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstCurrency: '',
      secondCurrency: '',
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
          text: 'Fx Currencies Close Price',
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
    fxs() {
      return this.$store.state.fx.fxs
    },
  },
  watch: {
    fxs(newVal) {
      this.setChartData()
    },
  },
  methods: {
    async addFx() {
      if (this.firstCurrency && this.secondCurrency) {
        this.loading = true
        let payload
        payload = {
          symbol:
            this.firstCurrency?.toUpperCase() +
            this.secondCurrency?.toUpperCase(),
        }
        await this.$store.dispatch('fx/getFx', payload)
        this.setChartData()
        this.loading = false
      }
    },
    async setChartData() {
      this.loading = true
      this.chartOptions.xaxis.categories = []
      this.series[0].data = []
      await this.fxs.map((el) => {
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
