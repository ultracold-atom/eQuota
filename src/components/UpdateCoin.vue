<template>
  <div class="symbol">
    <div class="f1">
      <div class="coin-text">
        <span>{{result.symbol}}</span> - 
        <span>{{result.lastPrice}}</span>
      </div>
        </div>
        <div  class="f2">
          <input type="number" :id=" '2'+result.symbol"  :value="result.count">
          <button @click="updateCart(result)" class="updateBtn">Update</button>
          <button @click="removeItem(result)" class="removeBtn">Remove</button>
        </div>
  </div>  
</template>

<script>
import { mapMutations } from 'vuex';  
export default {
  props:['result'],
  methods:{
    //Updating amount of coin in the cart
    updateCart(product) {
      if (document.getElementById('2'+product.symbol).value > 0){
        let count = document.getElementById('2'+product.symbol).value;
        product={...product,count};
        this.$store.commit('addToCart', product) 
        console.log(document.getElementById('2'+product.symbol).value)
      }
    },
    ...mapMutations(['removeItem','clearCart'])
  }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .symbol{
   /* background: red; */
      

    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    border: 1px solid #000000;
    border-radius: 6px;
    font-family: 'Roboto',sans-serif;
    font-weight: 700;
  }
  
  .symbol .coin-text{
    position: relative;
    top: 40%;
    display: flex;
    align-items: center;
  }
  
  .symbol .f2{
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
  
  .symbol input{
    position:relative;
    top:0;
    transform: translate(0,-30%);
    margin-right: 20px;
    border-radius: 10px;
    height: 28px;
    width: 78px;
    text-align: center;
  }
  
  .symbol button{
    border-radius: 6px;
    background-color: #0EDC79;
    padding: 6px 30px;
  
  }
  
  .symbol .updateBtn{
    background-color: #9897D1;
  }
  
  .symbol .removeBtn{
    background-color: #F8B1AC;
    margin-left: 12px;
  }
  

</style>
