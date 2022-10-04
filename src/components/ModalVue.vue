<template>
  <div class="modal">
    <input v-model="search" type="text" placeholder="Search">
    
    <div v-if="filteredFromCart.length === 0" class="list">
      <div  v-for="post in filteredFromAPI" :key="post">
        <AddCoin :result="post" />
      </div> 
    </div>
    
    <div v-for="item in filteredFromCart" :key="item" class="component">
      <UpdateCoin :result="item" />
    </div>
    
  </div>  
</template>


<script>
import AddCoin from '../components/AddCoin.vue'
import UpdateCoin from './UpdateCoin.vue'
export default {
  components:{ AddCoin,UpdateCoin},
  data(){
    return{
      search:''
    }
  },
  
  computed: {
    coinList(){
        return this.$store.state.apiCoins
    },
    cartList(){
        return this.$store.state.cart
    }, 
    filteredFromAPI() {
      return this.coinList.filter(post => {
        //return Object.values(post).toLowerCase() === this.search.toLowerCase()
        return Object.values(post).includes(this.search)
      })
    },
    filteredFromCart() {
      return this.cartList.filter(post => {
        //return Object.values(post)[0].toLowerCase() === this.search.toLowerCase()
        return Object.values(post).includes(this.search)
      })
    }    
  },
  async mounted(){
    await this.$store.dispatch('fetchCoins')
  }

}
</script>


<style >
  @import '../assets/Modal.css'
</style>