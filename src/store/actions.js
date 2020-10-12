export default {
  addCart(context, payload) {
    return new Promise((resolve) => {
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // let index=state.cartList
      if (oldProduct) {
        oldProduct.count += 1;
        resolve('当前商品数量+1');
      } else {
        payload.count = 1;
        context.state.cartList.push(payload);
        resolve('添加了新的商品');
      }

    })
  }
}