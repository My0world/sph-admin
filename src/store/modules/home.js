import mockRequest from "@/utils/mockrequest"
const home = {
    namespaced: true,
    actions: {
        //发请求获取首页的mock数据
        async getData(context){
            let result = await mockRequest.get('/home/list')
            if(result.code == 200){
                context.commit("GETDATA",result.data)
            }
        }
    },
    mutations: {
        GETDATA(state,v){
            state.data = v
        }
    },
    state: {
        data : {}
    },
    getters:{},
}
export default home