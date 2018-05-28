<template>
  <div class="ele-opeat" :class="{'show': cartNum > 0}">
    <span class="btn icon-minus" @click.stop.prevent="opeatMinus"></span>
    <span class="num">{{cartNum}}</span>
    <span class="btn icon-plus" @click.stop.prevent="opeatAdd"></span>
  </div>
</template>

<script>

export default {
  name: 'eleOpeat',
  data () {
    return {
    }
  },
  props:{
    prod:{type: Object}
  },
  methods:{
    opeatMinus(){
      this.$store.commit('opear', {type: 'minus', prod: this.prod})
    },
    opeatAdd(){
      this.$store.commit('opear', {type: 'add', prod: this.prod})
    }
  },
  computed: {    
    cartNum(){
      let cart = this.$store.state.cart, num, name = this.prod.name;
      for(let i = 0; i < cart.length; i++){
          let ele = cart[i];
          if(ele.name === name){
              num = ele.num;
              break;
          }
      }
      return num;    
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.ele-opeat
  width 100px
  position absolute
  right 0
  bottom 0px
  height 20px
  font-weight normal
  color #333
  display flex
  align-items center
  justify-content flex-end
  .btn
    display inline-block
    color #fff
    text-align center
    width 16px
    height 16px
    line-height 16px
    border 2px solid #00a0dc
    border-radius 50%
    background #fff
    &::before{
      font-size 12px
    }
    &.icon-plus
      background #00a0dc
    
    &.icon-minus
      color #00a0dc
  .num
    width 24px
    text-align center  
  .icon-minus, .num
      display none
  &.show
    .icon-minus, .num
      display block
</style>
