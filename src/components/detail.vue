<template>
  <div class="detail">
    <div class="prod-img">
      <img :src="prod.image">
    </div>
    <ul class="main">
      <li class="prod-desc">
        <div class="content">
          <h2 class="title">{{prod.name}}</h2>    
          <p class="desc">月售{{prod.sellCount}}份&nbsp;&nbsp;&nbsp;好评率{{prod.rating}}%</p>
          <div class="price-box">
            <span class="price">¥<strong>{{prod.price}}</strong> &nbsp;&nbsp;<del>¥<strong>{{prod.oldPrice}}</strong></del></span>
            <button type="button" @click="addCart(prod.id, prod.name, prod.price)">加入购物车</button>
          </div>
        </div>
        
      </li>
      <li>
        <div class="content">
          <h2 class="title">商品介绍</h2>
          <p>{{prod.info}}</p>
        </div>
      </li>      
      <li>
        <div class="content">
          <h2 class="title">商品评价</h2>
          <div class="tab">
            <span :class="{active: tabType == 0}" @click="changeTab(0)">全部<small>{{prod.ratings ? prod.ratings.length : 0}}</small></span>
            <span :class="{active: tabType == 1}" @click="changeTab(1)">推荐<small>{{upNum}}</small></span>
            <span :class="{active: tabType == 2}" @click="changeTab(2)">吐槽<small>{{downNum}}</small></span>
          </div>
        </div>        
        <p class="rating-check">
          <input type="checkbox" id="checkbox" v-model="isEmpty"><label for="checkbox">只看有内容的评价</label>
        </p>
        <div class="rating-box content">
          <ul class="rating-list">
            <li v-for="(item, index) in list" :key="index">
              <div class="user-box">
                <span class="rating-time">{{item.rateTime}}</span>
                <span class="rating-user">{{item.username}}<img :src="item.avatar"></span>
              </div>
              <p class="icon" :class="{'up': item.rateType === 0, 'down': item.rateType === 1}">{{item.text}}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <ele-cart></ele-cart>
  </div>
</template>

<script>
import axios from "axios";
import eleCart from './eleCart';
export default {
  data() {
    return {
      id: this.$route.query.id,
      prod: {},
      list: [],
      tabType: 0,
      isEmpty: false,
      upNum: 0,
      downNum: 0
    };
  },
  components:{
    eleCart
  },
  created() {
    axios.get("/good/goods").then(res => {
      let id = this.id,
        goods = [],
        len,
        prod;
      if (res.data.code === 0) {
        goods = res.data.data;
        len = goods.length;
        for (let i = 0; i < len; i++) {
          let food = goods[i].foods;
          prod = food.find(item => item.id == id);
          if (prod !== undefined) {
            this.prod = prod;
            this.list = prod.ratings.map(v => v)
            break;
          }
        }
      }
    });
  },
  methods:{
    changeTab(type){
      let prod = this.prod, 
          ratings = prod.ratings, 
          isEmpty = this.isEmpty;
      this.tabType = type;
      if(ratings){
        if(type === 0){
          this.list = ratings.filter(v => {
            if(isEmpty){
              return v.text !== '';
            }else{
              return true;
            }            
          });
        } else if(type === 1){
          this.list = ratings.filter(v => {
            if(isEmpty){
              return v.text !== '' && v.rateType === 0;
            }else{
              return v.rateType === 0;
            }             
          })
        }else{
          this.list = ratings.filter(v => {
            if(isEmpty){
              return v.text !== '' && v.rateType === 1;
            }else{
              return v.rateType === 1;
            }              
          })
        }
      }      
    },
    addCart(id, name, price){
      this.$store.commit('opear', {
        type: 'add',
        prod: {
          name: name,
          id: id,
          price: price
        }
      })
    }
  },
  watch: {
    prod:{
      handler:function (n, o) {
          let rating = n.ratings, up = 0, len = 0;
          if(rating){
            len = rating.length;
            for(let i = 0; i < len; i++){
              if(rating[i].rateType === 0){
                up += 1;
              }
            }
            this.upNum = up;
            this.downNum = len - up;
          }
      },
      deep:true
    },
    isEmpty: function(n, o){
      let prod = this.prod, ratings = prod.ratings, type = this.tabType, rateType;
      if(type === 1) rateType = 0;
      if(type === 2) rateType = 1;
      if(n){
        this.list = ratings.filter(v => {
          if(type){
            return v.text !== '' &&  v.rateType === rateType
          }else{
            return v.text !== ''
          }           
        })
      }else{
        this.list = ratings.filter(v => {
          if(type){
            return true && v.rateType === rateType
          }else{
            return true
          }           
        })
      }

    }
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';
.detail 
  padding-bottom 50px
  .prod-img 
    width: 100%;
    padding-top: 100%;
    position: relative;
    img
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
  .main
    background #f3f3f3
    li
      border-1px-top(rgba(7,17,27,.1))
      border-1px(rgba(7,17,27,.1))
      margin-bottom 16px
      &:last-child
        border-1px(rgba(7,17,27,0))
        margin-bottom 0px
      .content
        padding 18px
        p
          font-size 12px
          line-height 24px
          color rgb(77,85,93)
        .title
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
          margin-bottom 8px
        .desc
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
        .price-box
          margin 18px 0 0 0
          height 24px
          line-height 24px
          font-size 10px
          .price
            color #f00
            strong 
              font-size 14px
              font-weight 700
            del
              color rgb(147,153,159)
              margin-left 12px
          button
            outline none
            float right 
            background rgb(0,160,220)
            border none 
            line-height 12px
            color #ffffff
            border-radius 12px
            text-align center
            padding 6px 12px
            font-size 12px
        .tab
          overflow hidden
          span
            display inline-block
            padding 8px 12px
            font-size 12px
            background rgba(0,160,220,.2)
            border-radius 2px
            margin-right 8px
            &.active
              background rgb(0,160,220)
              color #fff
            small
              font-size 8px
              margin-left 4px
      .rating-check
        padding 0 18px 0 18px
        font-size 12px
        color rgb(147,153,159)
        line-height 48px
        input 
          appearance none
          -webkit-appearance none
          outline none
          width 12px
          height 12px
          background url("../assets/images/choose-off.png") no-repeat center center
          background-size cover
          margin-right 3px
          &:checked
            background-image url("../assets/images/choose-on.png")
      .rating-box
        overflow hidden
        padding-top 0
        padding-bottom 0
        .rating-list
          li
            padding-bottom 8px
            overflow hidden
            position relative
            .user-box
              margin 8px 0 6px 0
              display flex
              justify-content space-between
              align-items center
              font-size 10px
              color rgb(147,153,159)
              line-height 12px
              .rating-user
                img 
                  width 12px
                  height 12px
                  margin-left 6px
                  border-radius 50%
                  vertical-align middle
            p
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
              &::before
                display inline-block
                font-size 12px
                font-family: 'icomoon' !important;
                margin-right 6px
              &.up::before
                content '\e909'
                color rgb(0,160,220)
              &.down::before
                content '\e908'
                color rgb(147,153,159)




</style>
