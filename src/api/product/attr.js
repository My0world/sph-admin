//平台属性管理模块请求文件
import request from '@/utils/request'

//获取一级分类数据接口
export function repCategory1List() {
    return request({
        url: `/admin/product/getCategory1`,
        method: 'GET',
    })
}

//获取二级分类数据接口
export function repCategory2List(category1Id) {
    return request({
        url: `/admin/product/getCategory2/${category1Id}`,
        method: 'GET',
    })
}

//获取三级分类数据接口
export function repCategory3List(category2Id) {
    return request({
        url: `/admin/product/getCategory3/${category2Id}`,
        method: 'GET',
    })
}

//获取平台属性的数据
export function repAttrList(category1Id, category2Id, category3Id) {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'GET',
    })
}

//添加与修改属性与属性值接口
export function reqAddorUpdateAttr(data) {
    return request({
        url: `/admin/product/saveAttrInfo`,
        method: 'POST',
        data
    })
}

//删除属性
export function reqDeleteAttr(attrId) {
    return request({
        url: `/admin/product/deleteAttr/${attrId}`,
        method: 'DELETE',
    })
}