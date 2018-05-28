
import Mock from 'mockjs'
import data from './data.json'
import user from './user.json'
Mock.mock('/good/seller', {
    code: 0,
    codeMsg: 'success',
    data: data.seller
})

Mock.mock('/good/goods', {
    code: 0,
    codeMsg: 'success',
    data: data.goods
})

Mock.mock('/good/ratings', {
    code: 0,
    codeMsg: 'success',
    data: data.ratings
})

Mock.mock('/user', {
    code: 0,
    codeMsg: 'success',
    data: user
})