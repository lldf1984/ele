import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    cart: [],
    shopSeller: {}
}
const mutations = {
    opear(state, options) {
        let { type, prod } = options
        let name = prod.name, price = prod.price, id = prod.id
        let cart = state.cart
        let index
        switch (type) {
            case 'clear':
                cart = []
                break
            case 'add':
                index = cart.findIndex(item => item.id === id)
                if (index >= 0) {
                    cart[index].num += 1
                } else {
                    cart.push({ name: name, price: price, num: 1, id: id })
                }
                break
            case 'minus':
                index = cart.findIndex(item => item.id === id)
                if (index >= 0) {                    
                    if (cart[index].num === 1) {
                        cart.splice(index, 1)
                    }else{
                        cart[index].num -= 1
                    }
                }                
                break
        }
        state.cart = cart
    },
    getSellers(state, value) {
        state.shopSeller = value;
    }
}
const actions = {
    getSeller({commit}, value) {
        commit('getSellers', value)
    }
}
const getters = {
    cartNum(state) {
        let cart = state.cart
        let sum = cart.reduce((prev, item) => {
            return prev + item.num
        }, 0)
        return sum
    },
    total(state) {
        let cart = state.cart
        let sum = cart.reduce((prev, item) => {
            return prev + item.price * item.num
        }, 0)
        return sum
    },
    getPrice(stete, getters){
        let seller = state.shopSeller,
            price = getters.total,
            minStr = '¥0元起送',
            delivery = '另需配送费¥0元',
            classname = false,
            minPrice = 0,
            deliveryPrice = 0;
        if(seller){
            minPrice = seller.minPrice || 0;
            deliveryPrice = seller.deliveryPrice || 0;
            if(price == 0){
                minStr = '¥' + minPrice + '元起送';
                classname = false;
                delivery = '另需配送费¥' + deliveryPrice + '元';
            }else if(minPrice - price > 0){
                minStr = '还差' +  (minPrice - price) + '元起送';
                classname = false;
                delivery = '另需配送费¥' + deliveryPrice + '元';
            }else{
                minStr = '去结算';
                classname = true;
                delivery = '另需配送费¥' + deliveryPrice + '元';
            }
        }
        
        return {
            delivery: delivery,
            minStr: minStr,
            classname: classname
        }
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
