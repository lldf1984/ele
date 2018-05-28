<template>
  <div class="goods">
    <div class="main">
      <div class="type-wrapper" ref="typeWrapper">
        <ul>
          <li v-for="(item, i) in goods" :key="item.name + i" :class="{'active': currentIndex === i}" @click="selectIndex(i, $event)">
            <p><span class="icon" v-if="item.type === 1 | item.type === 2" :class="item.type === 1 ? 'hot' : item.type === 2 ? 'special' : ''"></span>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <div class="food-box">
          <dl v-for="(items,index) in goods" :key="items.name+index" class="food-item">
            <dt>{{items.name}}</dt>
            <dd v-for="(prod, prodIndex) in items.foods" :key="prod.name+prodIndex">
              <router-link :to="{path:'/index/detail', query:{id: prod.id}}">
                <img :src="prod.icon" :alt="prod.name">
                <h2>{{prod.name}}</h2>
                <p v-if="prod.description">{{prod.description}}</p>
                <p>月售{{prod.sellCount}}份&nbsp;&nbsp;&nbsp;好评率{{prod.rating}}%</p>
                <div class="price">                
                  ¥{{prod.price}}
                  <ele-opeat :prod="prod"></ele-opeat>
                </div>
              </router-link>
            </dd>
          </dl>
        </div>       
      </div>
    </div>
    <ele-cart></ele-cart>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Bscroll from 'better-scroll'
import eleCart from './eleCart'
import eleOpeat from './eleOpeat'
export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      heightArr: [],
      scrollY:0
    }
  },
  components:{
    eleCart,
    eleOpeat
  },
  created(){
    axios.get('/good/goods').then(res => {
      if(res.data.code === 0){
        this.goods = res.data.data;
        Vue.nextTick(() => {
          this.initScroll();
          this.computHeight();
        })
      }
    })
  },
  methods:{
    selectIndex(index, $event){
      if(!$event._constructed) return;
      let foodList = this.$refs.listWrapper.getElementsByClassName("food-item");
      this.foodScroll.scrollToElement(foodList[index], 300);
    },
    initScroll(){
      this.menuScroll = new Bscroll(this.$refs.typeWrapper, {
        click: true
      });
      this.foodScroll = new Bscroll(this.$refs.listWrapper, {
        click: true,
        probeType: 3
      });
      this.foodScroll.on('scroll', (pos) => { 
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    computHeight(){
      let foodList = this.$refs.listWrapper.getElementsByClassName("food-item");
      let height = 0;
      this.heightArr.push(height);
      for(let i = 0; i < foodList.length; i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.heightArr.push(height)
      }
    }
  },
  computed: {
    currentIndex(){
      let arr = this.heightArr,
          y = this.scrollY, 
          len = this.heightArr.length;
      for(let i = 0; i < len; i ++){    
        let height1 = arr[i];
        let height2 = arr[i+1] || arr[len-1];
        if(y >= height1 && y < height2){
            return i;
        }
      }
      return 0;
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.goods    
  .main   
    position fixed
    left 0
    top 174px
    right 0
    bottom 50px
    width 100% 
    display flex
    .type-wrapper
      width 80px
      text-align center
      overflow-x auto
      ul      
        li
          width 100%
          font-size 12px
          color #666
          background #f3f3f3
          overflow hidden
          &.active
            font-weight bold
            background #fff
            color #f00
          p          
            margin 0 12px
            padding 15px 0
            border-1px-bottom(rgba(7,17,27,.1))
            overflow hidden
          span 
            margin-right 3px
            &.hot
              ele-icon(16px, special_4)
    .list-wrapper
      flex 1
      overflow-x auto
      .food-box
        padding 0 18px
        dt
          width 100%
          font-size 12px
          color #666
          border-1px-bottom(rgba(7,17,27,.1))
          line-height 30px
        dd
          padding 15px 0 15px 70px
          min-height 60px
          border-1px-bottom(rgba(7,17,27,.1))
          font-size 12px
          position relative        
          img 
            position absolute
            left 0
            top 18px
            width 60px
            height 60px
          h2
            font-size 14px
            color #333
          p
            color #999
            padding-top 8px
          .price
            position relative
            padding-top 8px
            font-size 14px
            color #f00
            font-weight bold
            line-height 20px
        
</style>
