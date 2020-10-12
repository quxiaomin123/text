<template>
  <div id="detail">
    <detail-nav-bar class="nav" ref="nav2" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images=" topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-good-info @imageLoad="imageLoad" :detailInfo="detailInfo"></detail-good-info>
      <detail-param-info :paramInfo="GoodsParams" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods=" recommends" ref="recommends"></good-list>

    </scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail, Goods, Shop, GoodsParams, getCommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import scroll from "@/components/common/scroll/scroll";
import DetailGoodInfo from "@/views/detail/childComps/DetailGoodInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamsInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodList from "@/components/content/goods/GoodList";
import {debounce} from "@/common/utils";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";
import Toast from "@/components/content/toast/Toast";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      GoodsParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      isShow: false,
      message:'',
      show:false
    }
  },
  components: {
    DetailParamInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    scroll,
    DetailGoodInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  created() {
    //获取id
    this.iid = this.$route.params.iid
    //获取详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      //获取顶部轮播数据s
      this.topImages = res.data.result.itemInfo.topImages;
      // 获取下方数据
      const data = res.data.result;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //获取商家信息
      this.shop = new Shop(data.shopInfo);
      //保存商品详情
      this.detailInfo = data.detailInfo;
      //获取参数
      this.GoodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule);
      //获取评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

    })
    //获取推荐数据
    getCommend().then(res => {
      this.recommends = res.data.data.list;
    })
  },
  methods: {
    imageLoad() {
      console.log('aaaaaaaaaaaaaaa');
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      if (position.y <= (-1000)) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      const positionY = -position.y;
      if (positionY < 0) {
        this.$refs.nav2.currentIndex = 0
      } else if (positionY < this.themeTopYs[1]) {
        this.$refs.nav2.currentIndex = 0
      } else if (positionY < this.themeTopYs[2]) {
        this.$refs.nav2.currentIndex = 1
      } else if (positionY < this.themeTopYs[3]) {
        this.$refs.nav2.currentIndex = 2
      } else if (positionY >= this.themeTopYs[3]) {
        this.$refs.nav2.currentIndex = 3
      }

    },
    backClick() {
      this.$refs.scroll.ScrollTo(0, 0);
    },
    addToCart(){
      console.log('---');
      //获取购物车需要信息
      const product={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;
      product.checked=false
      //将商品加入购物车
      this.$store.dispatch('addCart',product).then(res=>{
       this.show=true;
       this.message=res;
       setTimeout(()=>{
         this.show=false;
         this.message=''
       },1500)
      })



    },
  },
  mounted() {
    //监听图片
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('detailItemImageLoad', () => {
      refresh();
    });
  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

.nav {
  z-index: 9;
  position: relative;
  background-color: #fff;
}
</style>