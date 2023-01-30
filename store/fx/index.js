export const state = () => ({
  fxs: [],
})

export const mutations = {
  setFxs(state, item) {
    let indx = state.fxs.findIndex((el) => el.ticker == item.ticker)
    if (indx > -1) {
      state.fxs[indx] = item
      this.$toast.success('Fx Currency updated with the new data')
    } else {
      // this.$toast.success('Stock Added successfully')
      state.fxs.push(item)
    }
  },
  deleteFx(state, item) {
    console.log('test')
    let indx = state.fxs.findIndex((el) => el.ticker == item.ticker)
    if (indx > -1) {
      state.fxs.splice(indx, 1)
      this.$toast.success('Fx Currency Deleted successfully')
    }
  },
}

export const actions = {
  async getFx({ commit }, payload) {
    let symbol = payload && payload.symbol ? payload.symbol : ''

    try {
      const res = await this.$axios.$get(
        `/v2/aggs/ticker/C:${symbol}/prev?adjusted=true&apiKey=9zbK2A8mE5tbYEEFPjQm1ifaTWoHFPvw`
      )
      if (res) {
        if (!res || res.status !== 'OK') {
          $nuxt.$toast.error('This Fx Currency has not accurate results')
        } else {
          commit('setFxs', res)
        }
      } else {
        $nuxt.$toast.error('This Fx Currency has not accurate results')
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
