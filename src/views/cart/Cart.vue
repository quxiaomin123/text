<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>

    <cart-list></cart-list>
    <cart-check-button></cart-check-button>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
// import scroll from "@/components/common/scroll/scroll";
import CartCheckButton from "@/views/cart/childComps/CartCheckButton";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartCheckButton
  }
}
</script>

<style scoped>
.cart-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  font-weight: 700;
}
</style>
