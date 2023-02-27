// 引入axios(axios进行二次封装)
import request from '@/utils/request'

// 获取品牌列表的接口 
// page：第几页
// limit：显示条数
export function repTradeMarkList(page,limit) {
  return request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET',
  })
}

//添加品牌
//携带两个参数：品牌名称、品牌logo
//切记对于新增的品牌，给服务器传递数据，不需要携带id，id是由服务器生成
export function repAddTradeMark(data) {
  return request({
    url:`/admin/product/baseTrademark/save`,
    method: 'POST',
    data
  })
}

//修改品牌
//携带三个参数：品牌ID、品牌名称、品牌logo
//切记对于修改的品牌，给服务器传递数据，需要携带id，需要告诉服务器修改的品牌
export function repUpdataTradeMark(data) {
  return request({
    url:`/admin/product/baseTrademark/update`,
    method: 'PUT',
    data
  })
}

// //添加和修改可以合并
// export function repAddOrUpdataTradeMark(data){
//   // 带给服务器数据携带ID----修改
//   if(data.id){
//     return request({
//       url:`/admin/product/baseTrademark/update`,
//       method: 'PUT',
//       data
//     })
//   }else{
//     // 新增品牌
//     return request({
//       url:`/admin/product/baseTrademark/save`,
//       method: 'POST',
//       data
//     })
//   }
// }

//删除品牌
export function repDeleteTradeMark(id) {
  return request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE',
  })
}