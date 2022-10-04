<template>
  <div class="symbol">
    <div class="f1">
      <div class="coin-text">
        <span>{{result.symbol }}</span> 
        -
        <span>{{ result.lastPrice}}</span>
      </div>
        </div>
        <div  class="f2">
          <input type="number" :id="result.symbol"  value="0">
          <button @click="addToCart(result)">Add</button> <!-- @click="addToCart(result)" eklenicek click karşısına   -->
        </div>
  </div>  
</template>

<script>
export default {
  props:['result'],
  methods:{
    //Adding Coin to Cart
		addToCart(product) {
      if (document.getElementById(this.result.symbol).value > 0){
        const count = document.getElementById(this.result.symbol).value;
        product={...product,count};
        this.$store.commit('addToCart', product) 
        console.log(document.getElementById(this.result.symbol).value)
      }
    },
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
  /*background-color: red; */
  width: 480px;
  position: relative;
  top:0;
  left:0;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  border: 1px solid #000000;
  border-radius: 6px;
  font-family: 'Roboto',sans-serif;
  font-weight: 700;
}

.symbol .coin-text{
  position: relative;
  top:40%;
  display: flex;
  align-items: center;
}

.symbol .f2{
  display: flex;
  align-items: center;
  
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

</style>