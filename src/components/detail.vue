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
            <button type="button">加入购物车</button>
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
            <span>全部<small>57</small></span>
            <span>推荐<small>57</small></span>
            <span>吐槽<small>57</small></span>
          </div>
        </div>        
        <p class="rating-check">
          <input type="checkbox" value="0" id="checkbox"><label for="checkbox">只看有内容的评价</label>
        </p>
        <div class="rating-box content">
          <ul class="rating-list">
            <li v-for="(item, index) in prod.ratings" :key="index">
              <div class="user-box">
                <span>{{item.username}}<img :src="item.avatar"></span>
                <span>{{item.rateTime}}</span>
              </div>
              <p class="icon" :class="{'like': item.rateType === 1}">{{item.text}}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.query.id,
      prod: {}
    };
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
            break;
          }
        }
      }
    });
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';
.detail 
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
        padding 12px 18px 0 18px
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
          &:checked
            background-image url("../assets/images/choose-on.png")



</style>
