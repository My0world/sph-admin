<template>
    <div class="lineChart">
        <div class="header">
            <span>搜索用户数 <i style="color: darkgrey;" class="el-icon-info"></i> </span>
        </div>
        <div class="main">
            <span>12324</span>
            <span>17.1 </span>
            <i v-if="false" class="el-icon-caret-top top"></i>
            <i v-else class="el-icon-caret-bottom bottom"></i>
        </div>
        <div class="mainChart">
            <div class="charts" ref="charts">
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "lineChart",
    data() {
        return {}
    },
    components: {},
    methods: {
    },
    mounted() {
        //初始化echarts实例
        let lineChart = this.echarts.init(this.$refs.charts)
        lineChart.setOption(
            {
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
                        data: [100, 50, 70, 80, 10, 20, 50, 50, 10, 80, 90],
                        smooth: true,
                        itemStyle: {
                            opacity: 0,
                            color: "lightskyblue"
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
                                    offset: 0, color: 'lightskyblue' // 0% 处的颜色
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
            }
        )

    },
}
</script>


<style lang="scss" scoped>
.lineChart {
    .header {
        margin-left: 15px;
    }

    .main {
        display: flex;
        margin: 15px 0 15px 15px;

        span:nth-of-type(1) {
            font-weight: 520;
            font-size: 25px;
        }

        span:nth-of-type(2) {
            margin-left: 20px;
            transform: translateY(-3px);
            font-size: 12px;
            color: darkgrey;
        }

        .top {
            color: red;
            transform: translateY(-3px);
        }

        .bottom {
            color: green;
            transform: translateY(-3px);
        }
    }

    .mainChart {
        height: 70px;

        .charts {
            width: 100%;
            height: 100%;
        }
    }
}
</style>


