<template>
  <div class="ratings">
    <div class="saller" v-if="seller.name">
      <div class="saller-rating">
        <h2>{{seller.score}}</h2>
        <h3>综合评分</h3>
        <p>高于周边商家{{seller.rankRate}}%</p>
      </div>
      <ul class="saller-star">
        <li><span class="star-name">服务态度</span><div class="star"><ele-star :score='seller.serviceScore' size="small"></ele-star></div><span class="star-num">{{seller.serviceScore}}</span></li>
        <li><span class="star-name">商品评分</span><div class="star"><ele-star :score='seller.foodScore' size="small"></ele-star></div><span class="star-num">{{seller.foodScore}}</span></li>
        <li><span class="star-name">送达时间</span><span class="send-time">{{seller.deliveryTime}}分钟</span></li>
      </ul>
    </div>
    <ul class="main">     
      <li>
        <div class="content">
          <h2 class="title">商品评价</h2>
          <div class="tab">
            <span :class="{active: tabType == 0}" @click="changeTab(0)">全部<small>{{ratings ? ratings.length : 0}}</small></span>
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
import axios from 'axios';
import eleStar from './eleStar';
import eleCart from './eleCart';
export default {
  name: 'ratings',
  data () {
    return {
      seller: {},
      ratings:[],
      list:[],
      isEmpty: false,
      upNum: 0,
      downNum: 0,
      tabType:0
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
    axios.get('/good/ratings').then(res => {
      if(res.data.code === 0){
        this.ratings = res.data.data;
        this.list = JSON.parse(JSON.stringify(res.data.data));
      }
    });
  },
  methods:{
    changeTab(type){
      let ratings = this.ratings, isEmpty = this.isEmpty;
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
    }
  },
  watch:{
    ratings:{
      handler:function (n, o) {
          let rating = n, up = 0, len = 0;
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
      let ratings = this.ratings, type = this.tabType, rateType;
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
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';
.ratings
  padding-bottom 50px
.saller
  display flex
  justify-content space-between
  .saller-rating
    width 138px
    text-align center
    margin  16px 0
    border-1px-right(rgba(7,17,27,.2))
    h2
      font-size 24px
      color rgb(255,153,0)
      line-height 28px
    h3
      font-size 12px
      line-height 12px
      color rgb(7,17,27)
      margin 6px 0 8px 0
    p
      font-size 10px
      color rgba(7,17,27,.5)
      line-height 10px
  .saller-star
    margin  16px 0 16px 24px
    flex 1
    font-size 12px
    li
      margin-bottom 8px
      &:last-child
        margin-bottom 0
      span, div
        display inline-block
      .star-name
        color rgb(7,17,27) 
      .star, .send-time
        margin 0 8px
      .send-time
        color rgba(7,17,27,.5)
      .star-num
        color rgb(255,153,0)
        line-height 18px
.main
  background #f3f3f3
  li
    border-1px-top(rgba(7,17,27,.1))
    border-1px(rgba(7,17,27,.1))
    margin-bottom 16px
    &:last-child
      margin-bottom 0
      border-1px(rgba(7,17,27,0))
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
