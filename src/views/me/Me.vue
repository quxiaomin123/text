<template>
  <div id="me">
    <nav-bar class="me-nav">
      <div slot="center">我的</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/common/navbar/NavBar";

export default {
  name: "Me",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.me-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
