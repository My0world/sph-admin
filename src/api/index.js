//将四个模块请求的接口统一暴露
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

//引入权限相关的文件


export default {
    tradeMark,
    attr,
    spu,
    sku,
}