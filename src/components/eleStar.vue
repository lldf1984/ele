<template>
  <div class="star-box" :class="{small: size === 'small'}">
    <span class="star" v-for="num in star"></span><span class="star off" :class="{'half': num == 1 && !ustar}" v-for="num in (5 - star)"></span>
  </div>
</template>

<script>

export default {
  name: 'star',
  data () {
    return {
      
    }
  },
  props:{
    score:{
      type: Number,
      default:0
    },
    size:{
      type: String,
      default: 'big'
    }
  },
  computed:{
    star(){
      let score = this.score || 0;
      return parseInt(score);
    }, 
    ustar(){
      let score = this.score || 0;
      return parseInt(score) == score;
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.star-box
    height 24px
    text-align center
    display inline-block
    overflow hidden
    .star
      float left 
      display inline-block
      ele-icon(24px, star48_on)
      margin 0 10px
      &.off
        bg-image(star48_off)
      &.half
        bg-image(star36_half)
    &.small
      display inline-block
      height 12px
      .star
        margin 0 2px
        ele-icon(12px, star48_on)
        &.off
          bg-image(star48_off)
        &.half
          bg-image(star36_half)
</style>
