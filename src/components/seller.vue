<template>
  <div class="seller">
    <div class="box">      
      <div class="content">
        <div class="favorite"><span class="icon-favorite"></span><p>已收藏</p></div>
        <h2>{{seller.name}}</h2>
        <div class="seller-info">
          <div class="star"><ele-star :score="seller.score" size="small"></ele-star></div>
          <span>({{seller.ratingCount}})</span>
          <span>月售{{seller.sellCount}}单</span>        
        </div>
        <ul class="seller-feature">
          <li>
            起送价
            <p><strong>{{seller.minPrice}}</strong>元</p>
          </li>
          <li>
            商家配送
            <p><strong>{{seller.deliveryPrice}}</strong>元</p>
          </li>
          <li>
            平均配送时间
            <p><strong>{{seller.deliveryTime}}</strong>元</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="box sell-desc">
      <div class="content">
        <h2>公告与活动</h2>
        <div class="desc">{{seller.bulletin}}</div>
        <ul class="active">
          <li v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            {{item.description}}
          </li>
        </ul>
      </div>
    </div>
    <div class="box sell-desc">
      <div class="content">
        <h2>商家实景</h2>
        <div class="img-wrapper">
          <div class="box-img">
            <div class="img" v-for="(items, i) in seller.pics" :key="i">
              <img :src="items">
            </div> 
          </div>                   
        </div>
      </div>
    </div>
    <div class="box sell-desc last">
      <div class="content">
        <h2>商家信息</h2>
        <ul class="info">
          <li v-for="(info, i) in seller.infos" :key="i">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
    <ele-cart></ele-cart>
  </div>
</template>

<script>
import axios from 'axios'
import eleStar from './eleStar'
import eleCart from './eleCart'
export default {
  name: 'seller',
  data () {
    return {
      seller: {}
    }
  },
  components:{
    eleStar,
    eleCart
  },
  created(){
    axios.get('/good/seller').then(res => {
      if(res.data.code === 0){
        this.seller = res.data.data;
      }
    });
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';
.box  
  border-1px(rgba(7,17,27,.1))
  font-size 12px
  &.last
    padding-bottom 50px
  .content    
    position relative
    padding 18px
    .favorite
      position absolute
      text-align center
      right 18px
      top 18px
      .icon-favorite
        font-size 24px
        color #f00
    h2
      font-size 14px
      line-height 14px
      color rgb($color)
      margin-bottom 8px
    .seller-info
      border-1px-bottom(rgba(7,17,27,.1))
      padding-bottom 18px
      .star
        margin-right 8px
        display inline-block
      span
        font-size 10px
        color rgb(77,85,93)
        line-height 18px
    .seller-feature
      overflow hidden
      li
        text-align center
        color rgb(147,153,159)
        float left
        width 33.33%
        border-1px-right(rgba(7,17,27,.1))
        margin-top 18px
        &:last-child
          border-1px-right(rgba(7,17,27, 0))
        p
          margin-top 4px
          margin-bottom  0
          color $color
          strong
            font-size 24px
            vertical-align baseline
  &.sell-desc
    margin-top 18px
    position relative
    border-1px-top(rgba(7,17,27,.1))   
    .desc
      color rgb(240,20,20)
      font-size 12px
      line-height 24px
      padding 0 12px
    .active
      padding 18px 12px 
      border-1px-top(rgba(7,17,27,.1))   
      li
        padding 16px 12px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          padding-bottom 0
          border-1px(rgba(7,17,27,0))
        .icon 
          display inline-block
          width 16px
          height 16px
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
    .img-wrapper      
      margin-top 12px
      overflow-y scroll 
      width 100%
      height 90px
      .box-img
        white-space nowrap 
        display table
        .img
          padding-right 6px
          display table-cell
          img
            width 120px
            height 90px
            float left
    .info
      border-1px-top(rgba(7,17,27,.1))   
      li
        padding 16px 12px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          padding-bottom 0
          border-1px(rgba(7,17,27,0))


</style>
