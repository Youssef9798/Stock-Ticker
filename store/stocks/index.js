export const state = () => ({
  stocks: [],
})

export const mutations = {
  setStocks(state, item) {
    let indx = state.stocks.findIndex((el) => el.ticker == item.ticker)
    if (indx > -1) {
      state.stocks[indx] = item
      this.$toast.success('Stock updated with the new data')
    } else {
      // this.$toast.success('Stock Added successfully')
      state.stocks.push(item)
    }
  },
  deleteStock(state, item) {
    let indx = state.stocks.findIndex((el) => el.ticker == item.ticker)
    if (indx > -1) {
      state.stocks.splice(indx, 1)
      this.$toast.success('Stock Deleted successfully')
    }
  },
}

export const actions = {
  async getStock({ commit }, payload) {
    let symbol = payload && payload.symbol ? payload.symbol : ''
    try {
      const res = await this.$axios.$get(
        `/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=9zbK2A8mE5tbYEEFPjQm1ifaTWoHFPvw`
      )
      if (res) {
        if (!res || res.status !== 'OK') {
          $nuxt.$toast.error('This Stock has not accurate results')
        } else {
          commit('setStocks', res)
        }
      }
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.error) {
        $nuxt.$toast.error(`${err.response.data.error}`)
      } else {
        $nuxt.$toast.error('Something Went Wrong')
      }
    }
  },
}
