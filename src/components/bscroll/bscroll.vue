<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "bscroll",
  props:{
    handleScroll:{
      type:Function,
      default: function(){}
    },
    handleTouchEnd:{
      type:Function,
      default: function(){}
    }
  },
  mounted() {
    var sroll = new BScroll(this.$refs.wrapper,{
      tap: true,
      probeType: 1
    })
    this.scroll = sroll
    sroll.on("scroll",(pos)=>{
      this.handleScroll(pos)
    })
    sroll.on("touchEnd",(pos)=>{
      this.handleTouchEnd(pos)
    })

  },
  methods: {
    toScrollClick(y){
      this.scroll.scrollTo(0, y)
    }
  },
}
</script>

<style>
  .wrapper{
    height: 100%
  }
</style>
