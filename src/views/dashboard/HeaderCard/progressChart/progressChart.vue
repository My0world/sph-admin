<template>
    <div class="progressChart" ref="charts">

    </div>
</template>


<script>
export default {
    name: "progressChart",
    data() {
        return {}
    },
    components: {},
    methods: {},
    mounted() {
        //初始化echarts实例
        let lineChart = this.echarts.init(this.$refs.charts)
        lineChart.setOption({
            xAxis: {
                //x轴显示的最大度数
                max: function (v) {
                    return v.max + 30
                },
                // 隐藏x轴
                show: false,

            },
            yAxis: {
                //隐藏y轴
                show: false,
                // y轴的data变为series.data
                type: "category"
            },
            series: [
                {
                    //柱状图
                    type: "bar",
                    //数据
                    data: [75],
                    //颜色
                    color: "#d01e7a",
                    //柱状图宽度
                    barWidth: 20,
                    //背景颜色设置
                    showBackground: true,
                    backgroundStyle: {
                        color: "#eee"
                    },
                    // //文本标签
                    // label: {
                    //     show: true,
                    //     //改变文本内容
                    //     formatter: "|",
                    //     //文本标签
                    //     position:'right'
                    // }
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
.progressChart {
    width: 100%;
    height: 100%;
    /* color: #d01e7a; */
}
</style>

