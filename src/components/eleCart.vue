<template>
  <div class="ele-cart">
    <div class="main" :class="{'active': cart && cart.length > 0}">
      <div class="round" @click="show = !show" >
        <span class="icon-shopping_cart"></span>
        <span class="num" v-if="cart_num">{{cart_num}}</span>
      </div>
      <div class="price">
        <span class="prod-price">¥{{cart_total}}</span>
        <span class="prod-send" v-if="cart_send">{{cart_send.delivery}}</span>
      </div>
      <div class="send" v-if="cart_send" :class="{'ok': cart_send.classname}">
        {{cart_send.minStr}}
      </div>
    </div>
    <div class="cart-box" v-if="cart && cart.length > 0 && show" @click="show = !show">
      <div class="cart-list">
          <dl>
            <dt>购物车<span @click.stop.prevent="clear">清空</span></dt>
            <dd v-for="(list, index) in cart" :key="index">
              <h2>{{list.name}}</h2>
              <span class="price">¥{{list.price}}</span>
              <div class="opeartion">
                <ele-opeat :prod="list"></ele-opeat>
              </div>
            </dd>            
          </dl>
      </div>
    </div>
  </div>
</template>

<script>
import eleOpeat from './eleOpeat'
export default {
  name: 'eleCart',
  data () {
    return {
      show: false
    }
  },
  components:{
    eleOpeat
  },
  methods:{
    clear(){
      this.$store.commit('opear', {type: 'clear', prod:{}})
    }
  },
  computed: {
    cart(){
      return this.$store.state.cart;
    },
    cart_num(){
      return this.$store.getters.cartNum
    },
    cart_total(){
      return this.$store.getters.total
    },
    cart_send(){
      return this.$store.getters.getPrice
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.ele-cart
  position fixed
  left 0
  bottom 0
  height 50px
  width 100%
  background #141d27
  z-index 2
  .main
    position fixed
    width 100%
    display flex
    z-index 5
    color rgba(255,255,255,.4)
    .round
      position relative
      margin -11px 12px 0 12px
      background #141d27
      border-radius 50%      
      width 44px
      height 44px
      padding 6px
      .icon-shopping_cart
        display inline-block
        text-align center
        font-size 24px
        line-height 44px
        background rgba(255,255,255,.2)
        width 44px
        height 44px
        border-radius 50%
      
      .num
        position absolute
        right 0
        top 0
        background #f00
        color #fff
        font-weight 700
        font-size 9px
        line-height 16px
        height 16px
        padding 0 6px
        border-radius 8px
        box-shadow 0 2px 4px 0px rgba(0,0,0,.4)
    .price
      flex 1
      margin 11px 12px 11px 0
      line-height 28px
      .prod-price
        font-size 16px
        font-weight bold
        border-1px-right(rgba(255,255,255,.2))
        padding-right 12px
      .prod-send
        margin-left 12px
        font-size 12px
    .send
      line-height 50px
      padding 0 8px
      width 89px
      text-align center
      background rgba(255,255,255,.2)
      font-size 12px
      font-weight bold
      &.ok
        background #56d176
        color #fff
    &.active
      .icon-shopping_cart, .prod-price
        color #fff
      .icon-shopping_cart
        background #00a0dc
  .cart-box
    z-index 3
    position fixed
    width 100%
    height 100%
    background rgba(7,17,27,.6)
    top 0
    left 0
    .cart-list
      z-index 4
      position fixed
      bottom 50px
      left 0
      width 100%
      background #fff
      font-size 14px
      color #333
      dl
        dt
          height 40px
          line-height 40px
          border-1px-bottom(rgba(7,17,27,.1))
          padding 0 12px
          span 
            float right
            color rgb(0,160,220)
        dd
          display flex
          justify-content space-between
          padding 12px
          border-1px-bottom(rgba(7,17,27,.1))
          line-height 24px
          h2
            flex 1
          .price
            color #f00
            font-weight bold
            text-align right
            padding 0 12px
            span
              font-size 12px
              font-weight normal
          .opeartion
            width 100px
            position relative
              

</style>
