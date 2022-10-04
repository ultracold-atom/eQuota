/* eslint-disable */ 
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const URI = 'https://api2.binance.com/api/v3/ticker/24hr'

export default new Vuex.Store({
	state: {
	    cart: [],
        apiCoins:[],
	},
	mutations: {
	    getCoinList(state, coin) {
			state.apiCoins = coin	
		},		
		addToCart({ cart}, product) {
			const itemIndex = cart.findIndex(item => item.symbol === product.symbol) //item => item.id === product.id

			if (itemIndex === -1) {
				cart.push(product)
			} else {
                cart[itemIndex].count = parseInt(product.count) //  parseInt(product.count) + parseInt(cart[itemIndex].count) idi şimdilik kalsın
			}
		},	
		removeItem({ cart }, product) {
			const itemIndex = cart.findIndex(item => item.symbol === product.symbol)

			cart.splice(itemIndex, 1)
		},
		clearCart(state) {
			state.cart = []
		}
	},
	actions: {
		fetchCoins({commit}) {
			fetch(URI)
				.then(res => res.json())
				.then(data => {commit('getCoinList',data)})
			}
	}
})