//平台属性管理模块请求文件
import request from '@/utils/request'

//获取SPU列表数据接口
export function repSpuList(page, limit, category3Id) {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: 'GET',
        params: {
            category3Id
        }
    })
}

//获取某一个SPU信息
export function repSpu(spuId) {
    return request({
        url: `/admin/product/getSpuById/${spuId}`,
        method: 'GET',
    })
}

//获取品牌的信息
export function repTradeMarkList() {
    return request({
        url: `/admin/product/baseTrademark/getTrademarkList`,
        method: 'GET',
    })
}

//获取SPU图片的接口
export function repSpuImageList(spuId) {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'GET',
    })
}

//获取平台全部的销售属性
export function repBaseSaleAttrList() {
    return request({
        url: `/admin/product/baseSaleAttrList`,
        method: 'GET',
    })
}


//修改Spu||添加Spu:对于修改或者添加，携带给服务器参数大致一样的，唯一区别就是携带的参数是否带id
//修改Spu
export function repUpdateSpu(spuInfo) {
    return request({
        url: `/admin/product/updateSpuInfo`,
        method: 'POST',
        data: spuInfo
    })
}
// 添加Spu
export function repAddSpu(spuInfo) {
    return request({
        url: `/admin/product/saveSpuInfo`,
        method: 'POST',
        data: spuInfo
    })
}

// 删除Spu
export function repDeleteSpu(spuId) {
    return request({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: 'DELETE',
    })
}

//获取销售属性的数据
export function repSpuSaleAttrList(spuId) {
    return request({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'GET',
    })
}

//获取平台属性的数据
export function repAttrInfoList(category1Id, category2Id, category3Id) {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'GET',
    })
}

//保存sku
export function reqAddSku(data) {
    return request({
        url: `/admin/product/saveSkuInfo`,
        method: 'POST',
        data
    })
}

//获取sku列表数据
export function reqSkuList(spuId) {
    return request({
        url: `/admin/product/findBySpuId/${spuId}`,
        method: 'GET',
    })
}