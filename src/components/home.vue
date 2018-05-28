<template>
  <div class="home">
    <div class="top">
      <ele-top :seller='seller'></ele-top>
    </div>
    <div class="tab">
      <div class="tab-item"><router-link to="goods">商品</router-link></div>
      <div class="tab-item"><router-link to="ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="seller">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
    

</template>

<script>
import eleTop from './eleTop'
import axios from 'axios'
export default {
  data(){
    return {
      seller: {}
    }
  },
  components:{
    eleTop
  },
  created(){
    axios.get('/good/seller').then(res => {
      if(res.data.code === 0){
        this.seller = res.data.data;
        this.$store.dispatch('getSeller', res.data.data)
      }
    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.home
  width 100%
  .tab
    display flex
    justify-content space-between
    height 40px
    .tab-item
      flex 1
      text-align center
      font-size 14px
      border-1px($line)
      border-1px-bottom($line)
      a
        color #333
        line-height 100%;
        height 100%;
        display block
        line-height 40px
        &.active
          color #f00
</style>
