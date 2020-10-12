<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行','精选','新款']" @tabClick="tabClick" ref="tabControl1" class="tabContent"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommend-vive :recommend="recommend"></recommend-vive>
      <feature></feature>
      <tab-control :title="['流行','精选','新款']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
  </div>

</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultiData, getGoodsData} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendVive from "@/views/home/childComps/RecommendVive";
import Feature from "@/views/home/childComps/Feature";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import scroll from "@/components/common/scroll/scroll";
import BackTop from "@/components/content/backTop/BackTop";
import {debounce} from "@/common/utils";

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
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      savey: 0
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
  mounted() {
    //监听图片
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('homeItemImageLoad', () => {
      // console.log('aaa');
      refresh();
    });

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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //判断返回顶部是否显示
      if (position.y <= (-1000)) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      //判断“精选..” 是否吸顶（position ：fixed）
      if ((-position.y) > this.tabOffsetTop) {
        this.isTabFixed = true
      } else {
        this.isTabFixed = false
      }


    },
    loadMore() {
      console.log('aa');
      this.getGoodsData(this.currentType);

    },
    backClick() {
      this.$refs.scroll.ScrollTo(0, 0);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

  },
  activated() {
    this.$refs.scroll.ScrollTo(0, this.savey, 0);
    this.$refs.scroll.refresh()
  },
  deactivated() {

    this.savey = this.$refs.scroll.scroll.y;
  }


}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/

}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabContent {
  position: relative;
  z-index: 9;
}
</style>
