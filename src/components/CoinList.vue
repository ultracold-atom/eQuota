<template>
  <div class="modal">
    <div v-for="(coin,index) in coinList" :key="index" class="coin">
      {{index+1}}-){{coin.symbol}}
    </div>
  </div>  
</template>


<script>
export default {

  computed: {
    coinList(){
        return this.$store.state.apiCoins.slice(0,56)
    }
  },
  async mounted(){
    await this.$store.dispatch('fetchCoins')
  }
    
}
</script>


<style>
  
  .modal{
    z-index: 10;
    width: 50%;
    height: 60%;
    background: #fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    border: 1px solid #000000;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
  }

  .modal .coin{
    margin: 5px;  
  }

</style>