<template>
    <div class="barChart" ref="charts">

    </div>
</template>


<script>
export default {
    name: "barChart",
    components: {},
    data() {
        return {}
    },

    methods: {},
    mounted() {
        //初始化echarts实例
        let lineChart = this.echarts.init(this.$refs.charts)
        lineChart.setOption({
            xAxis: {
                // 隐藏x轴
                show: false,
                // x轴的data变为series.data
                type: "category"
            },
            yAxis: {
                //y轴显示的最大度数
                max: function (v) {
                    return v.max + 10
                },
                //y轴显示的最小度数
                min: function (v) {
                    return v.min - 20
                },
                //隐藏y轴
                show: false
            },
            series: [
                {
                    //柱状图
                    type: "bar",
                    //颜色
                    color:"hotpink",
                    //数据
                    data: [10, 50, 70, 20, 100, 20, 50, 60, 70, 50, 10, 0, 90],
                }
            ],
            grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            //自适应
            media: [{
                query: {
                    minWidth: 200,
                    maxHeight: 200
                }
            }]
        })
    },

}
</script>


<style>
.barChart {
    width: 100%;
    height: 100%;
    /* color: hotpink; */
}
</style>

