export const state = () => ({
  stocks: [],
})

export const mutations = {
  setStocks(state, item) {
    state.stocks.push(item)
  },
}

export const actions = {
  async getStock({ commit }, payload) {
    let symbol = payload && payload.symbol ? payload.symbol : ''
    let func =
      payload && payload.func ? payload.func : 'TIME_SERIES_DAILY_ADJUSTED'
    let hasInterval =
      payload && payload.hasInterval ? payload.hasInterval : false
    let interval =
      payload && payload.hasInterval && payload.interval
        ? payload.interval
        : '5min'

    try {
      const res = await this.$axios.$get(
        `/query?function=${func}&symbol=${symbol}${
          hasInterval ? '&interval=' + interval : ''
        }&apikey=L5KQWE5QR8YZYR4R`
      )
      if (res) {
        console.log(res)
        if (!res[`Meta Data`]) {
          $nuxt.$toast.error('This Stock is not exist')
        } else {
          commit('setStocks', res)
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
}
