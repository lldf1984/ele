<template>
  <div>
    <div class="top" :style="{'background-image': 'url(' + seller.avatar + ')'}">
      <img :src="seller.avatar" class="big-avatar">
      <div class="shop-info">
          <div class="shop-img"><img :src="seller.avatar"></div>
          <div class="shop-desc">
            <h2><span></span>{{seller.name}}</h2>
            <p>{{seller.description}}/{{seller.deliveryTime}}分送达</p>
            <p v-if="seller.supports && seller.supports.length > 0">
              <span class="icon" :class="seller.supports ? classMap[seller.supports[0].type] : ''"></span>{{seller.supports ? seller.supports[0].description : ''}}
            </p>
          </div>
          <div class="shop-active-num " v-if="seller.supports" @click="isShow = true">
            {{seller.supports ? seller.supports.length : ''}}个<span class="icon-keyboard_arrow_right"></span>
          </div>
      </div>
      <div class="shop-ad" @click="isShow = true">      
        <span class="icon"></span>
        <span class="shop-ad-dec ">{{seller.bulletin}}</span>   
        <span class="icon-keyboard_arrow_right"></span>   
      </div>
    </div>
    <div class="bulletin" v-show="isShow">
      <h2>{{seller.name}}</h2>
      <div class="star-box">
        <ele-star :score="seller.score" size="big"></ele-star>
      </div>
      <dl v-if="seller.supports && seller.supports.length > 0">
        <dt>
          <span class="line-before"></span>
          <span class="title">优惠信息</span>
          <span class="line-after"></span>
        </dt>
        <dd v-for="(item, index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[item.type]"></span>{{item.description}}
        </dd>
      </dl>
      <dl>
        <dt>
          <span class="line-before"></span>
          <span class="title">商家公告</span>
          <span class="line-after"></span>
        </dt>
        <dd>
          {{seller.bulletin}}
        </dd>
      </dl>
      <div class="close">
        <span class="icon-close" @click="isShow = false"></span>
      </div>
    </div>
  </div>
</template>

<script>
import eleStar from './eleStar'
export default {
  name: 'eleTop',
  data () {
    return {
      isShow: false
    }
  },
  components:{
    eleStar
  },
  props:{
    seller: {
      type: Object
    }
  },
  created(){
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.bulletin
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background rgba(7,17,27,.8)
  z-index 99
  color #fff
  padding 64px 36px 32px 36px
  box-sizing border-box
  h2
    font-size 16px
    font-weight bold
    line-height 32px
    text-align center
  .star-box
    margin-top 16px
  dl
    dt
      position relative
      text-align center
      font-weight bold
      margin-top 28px
      heigh 14px
      margin-bottom 24px
      .line-before, .line-after
        display inline-block
        content ''
        width 112px
        height 0px
        position absolute
        top 50%
        border-bottom 1px solid rgba(255,255,255,.2)
        overflow hidden      
      .line-before
        left 0
      .line-after
        right 0
      .title 
        padding 0 12px;
        display inline-block
        font-size 14px
    dd
      font-size 12px
      line-height 24px
      .icon
          margin-right 4px          
          &.decrease
            ele-icon(16px, 'decrease_3')
          &.discount
            ele-icon(16px, 'discount_3')
          &.guarantee
            ele-icon(16px, 'guarantee_3')
          &.invoice
            ele-icon(16px, 'invoice_3')
          &.special
            ele-icon(16px, 'special_3')
  .close
    position fixed
    bottom 32px
    left 0
    width 100%
    text-align center
    font-size 32px
.top 
  position relative
  overflow hidden
  height 134px
  .big-avatar
    filter blur(10px)
    width 100%
  .shop-info
    position absolute
    width 100%
    height 134px
    left 0
    top 0
    background-color rgba(7,17,27,.5)    
    display flex
    .shop-img
      width 64px
      height 64px
      border-radius 4px
      overflow hidden
      margin 24px 16px 28px 24px
      img 
        width 64px
        heigh 64px
    .shop-desc
      flex 1
      font-size 12px
      color #fff
      margin-top 24px
      h2
        font-size 16px
        font-weight 500
        line-height 22px
        span 
          ele-img(30px,18px,brand)
          margin-right 6px
      p
        line-height 22px
        .icon
          margin-right 4px
          &.decrease
            ele-icon(16px, 'decrease_3')
          &.discount
            ele-icon(16px, 'discount_3')
          &.guarantee
            ele-icon(16px, 'guarantee_3')
          &.invoice
            ele-icon(16px, 'invoice_3')
          &.special
            ele-icon(16px, 'special_3')
    .shop-active-num
      position absolute
      right 24px
      bottom 45px
      background rgba(0,0,0,.2)
      padding 7px 8px
      border-radius 24px
      font-size 10px
      line-height 10px
      color #fff
  .shop-ad
    position absolute
    left 0
    bottom 0
    height 28px
    padding 0 12px  
    width 100%
    box-sizing border-box  
    background rgba(7,17,27,.2)
    font-size 10px
    line-height 10px
    color #fff
    display flex
    align-items center
    .icon
      ele-img(22px, 12px, bulletin)
    .shop-ad-dec    
      flex 1   
      line-height 28px
      vertical-align middle  
      text-overflow ellipsis 
      overflow hidden
      white-space nowrap   
      margin-left 4px 

</style>
