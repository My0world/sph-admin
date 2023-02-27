<template>
    <div class="lineChart" ref="charts">

    </div>
</template>


<script>
export default {
    name: "lineChart",
    data() {
        return {}
    },
    methods: {},
    mounted() {
        //初始化echarts实例
        let lineChart = this.echarts.init(this.$refs.charts)
        lineChart.setOption({
            xAxis: {
                show: false,
                type: "category"
            },
            yAxis: {
                max: function (v) {
                    return v.max + 10
                },
                min: function (v) {
                    return v.min - 20
                },
                show: false
            },
            series: [
                {
                    type: "line",
                    data: [10, 50, 70, 20, 100, 20, 50, 60, 70, 50, 10, 0, 90],
                    smooth: true,
                    itemStyle: {
                        opacity: 0,
                        color: "purple"
                    },
                    areaStyle: {
                        opacity: 0.3,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffffff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
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
.lineChart {
    width: 100%;
    height: 100%;
}
</style>

