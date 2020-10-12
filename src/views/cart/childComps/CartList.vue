<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in $store.state.cartList" :product="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>

import scroll from "@/components/common/scroll/scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components: {
    scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 50px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>