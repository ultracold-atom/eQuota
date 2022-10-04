<template>
  <div id="app">

    <div class="buttons">
      <button @click="showModal = !showModal">Add Stock</button>
      <button @click="updateData">Refresh</button>
      <button @click="showList = !showList">Show List</button>
    </div>

    <hr>

    <div v-if="!showModal" class="vr"></div>

     <!--Listing the coins from Cart-->
    <div class="symbols">                                   
      <div v-for="item in cart" :key="item" class="symbol">
        <div class="f1">
          <p>{{item.symbol}}</p>
          <div>
            <span>{{item.lastPrice}}</span> - 
            <span>{{item.weightedAvgPrice}}</span>
          </div>
        </div>
        <div class="f2">
          <input type="number" :id="item.symbol" :value="item.count">
          <button @click="updateCart(item)" class="updateBtn">Update</button>
          <button @click="removeItem(item)" class="removeBtn">Remove</button>
        </div>       
      </div>
      <button v-if="cart.length>0" @click="clearCart" class="removeBtn">Clear All</button>
    </div>
   

    <!--Getting the Pie-Chart--> 
    <Chart />
    
    <!--Getting the Modal Component-->
    <transition name="fade">
      <div v-if="showModal">
        <Modal />       
      </div>
    </transition>   

    <!--Listing first 56 Coins to help the User -->
    <transition name="fade">
      <div v-if="showList && !showModal">
        <CoinList />       
      </div>
    </transition>  

   
  </div>
</template>

<script>
import { mapMutations} from 'vuex'  
import Modal from '../src/components/ModalVue.vue'
import CoinList from './components/CoinList.vue'
import Chart from '../src/components/PieChart.vue'
export default {
  name: 'App',
  components: {
    Chart,
    Modal,
    CoinList
},
  data(){
    return{
      symbols: ["aslan","kaplan","börtü","böcek"],
      data : null,
      search: null,
      showModal : false,
      showList: false
    }
  },
 
  //Getting all coins and the coins at Cart
  computed: {
    cart(){
      return this.$store.state.cart
    },
    coinList(){
      return this.$store.state.apiCoins
    } 
  },

  methods:{
 
    fetcher(){
      this.$store.dispatch('fetchCoins')
    },
  
    //Updating the data from API with Refresh Button
    async updateData(){                    
      await this.$store.dispatch('fetchCoins')
      this.cart.map(k=>{
        const item = this.coinList.find(el=>el.symbol === k.symbol)
        k.lastPrice = item.lastPrice
        k.weightedAvgPrice = item.weightedAvgPrice
      })
    },

    //Updating the quantity of the coins in the Cart
		updateCart(product) {        
      if (document.getElementById(product.symbol).value > 0){
        let count = document.getElementById(product.symbol).value;
        product={...product,count};
        this.$store.commit('addToCart', product) 
        console.log(document.getElementById(product.symbol).value)
      }
    },
    ...mapMutations(['removeItem','clearCart'])  
  },

  //Updating the Data in every 20 minutes
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.updateData();
      },1200000);
    })
  },

}

</script>

<style>

  @import '../src/assets/App.css'

</style>
