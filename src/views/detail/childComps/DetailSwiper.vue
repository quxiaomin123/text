<template>

    <swiper class="swiper1">
      <swiper-item v-for="(item,index) in topImages" :key="index" >
        <img :src="item">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'
export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    },

  },
  components:{
    SwiperItem,
    Swiper
  }
}
</script>

<style scoped>
.swiper1{
  height: 300px;
  overflow: hidden;
}
</style>