//平台属性管理模块请求文件
import request from '@/utils/request'

//获取Sku列表的数据接口
export function reqSkuList(page, limit) {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: "GET"
    })
}

//上架
export function reqOnSale(skuId) {
    return request({
        url: `/admin/product/onSale/${skuId}`,
        method: "GET"
    })
}

//下架
export function reqCancelSale(skuId) {
    return request({
        url: `/admin/product/cancelSale/${skuId}`,
        method: 'GET'
    })
}

//获取sku详情的接口
export function reqSkuById(skuId) {
    return request({
        url: `/admin/product/getSkuById/${skuId}`,
        method: 'GET'
    })
}

//删除Sku
export function reqDeleteSku(skuId) {
    return request({
        url: `/admin/product/deleteSku/${skuId}`,
        method: 'DELETE'
    })
}