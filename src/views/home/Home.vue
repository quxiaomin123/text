<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-vive :recommend="recommend"></recommend-vive>
      <feature></feature>
      <tab-control :title="['流行','精选','新款']" class="tab-control" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
  </div>

</template>
<script>
import NavBar from "@/common/navbar/NavBar";
import {getHomeMultiData, getGoodsData} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendVive from "@/views/home/childComps/RecommendVive";
import Feature from "@/views/home/childComps/Feature";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import scroll from "@/components/common/scroll/scroll";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "Hone",
  data() {
    return {
      result: null,
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},

      },
      currentType: 'pop',
      isShow:false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendVive,
    Feature,
    TabControl,
    GoodList,
    scroll,
    BackTop
  },
  created() {
    //请求多个数据
    this.getHomeMultiData();
    //请求商品数据
    this.getGoodsData('pop');
    this.getGoodsData('new');
    this.getGoodsData('sell');

  },
  methods: {
    // /**事件监听*/
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    contentScroll(position){
      if(position.y<=-1000){
        this.isShow=true
      }
      else{
        this.isShow=false
      }
    },
    loadMore(){
      console.log('aa');
      this.getGoodsData(this.currentType);

    },
    backClick(){
      this.$refs.scroll.ScrollTo(0,0);
    },
    // /* 网络请求*/
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.result = res;
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      }).catch(err => {
        console.log(err);
      })
    },
    getGoodsData(type) {
      const page = this.goods[type].page + 1;

      getGoodsData(type, page
      ).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      })
    },

  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
