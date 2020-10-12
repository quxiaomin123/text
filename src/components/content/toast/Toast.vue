<template>
  <div class="toast" v-show="show">
    <div> {{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default() {
        return null
      }
    },
    show:{
      type:Boolean,
      default() {
        return false;
      }
    }
  },

}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0,0,0,0.75);
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;

}
</style>