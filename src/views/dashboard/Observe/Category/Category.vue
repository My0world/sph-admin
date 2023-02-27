<template>
    <div class="Category">
        <el-card>
            <div slot="header" class="clearfix">
                <span style=" color: #c3c1c1;font-size: 15px;">销售额类别占比</span>
                <el-radio-group v-model="value" size="mini" class="radio">
                    <el-radio-button label="全部渠道"></el-radio-button>
                    <el-radio-button label="线上"></el-radio-button>
                    <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="chart" ref="chart">

            </div>
        </el-card>
    </div>
</template>


<script>
export default {
    name: "Category",
    data() {
        return {
            value: "全部渠道"
        }
    },
    components: {},
    methods: {},
    mounted() {
        let lineChart = this.echarts.init(this.$refs.chart)
        lineChart.setOption({
            title: {
                text: "视频",
                textStyle: {
                    fontSize: 25
                },
                subtext: "1048",

                left: "center",
                top: "43%"
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: '视频' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union' },
                        { value: 300, name: 'Video' }
                    ]
                }
            ]
        })
        //绑定事件
        lineChart.on('mouseover', (params) => {
            //获取鼠标移上去那条数据
            const { name, value } = params.data
            lineChart.setOption({
                title: {
                    text: name,
                    textStyle: {
                        fontSize: 22
                    },
                    subtext: value,
                    subtextStyle: {
                        fontSize: 12
                    },

                    left: "center",
                    top: "43%"
                }
            })

        });
    },
}
</script>


<style lang="scss" scoped>
.Category {
    ::v-deep .clearfix {
        position: relative;
    }

    .chart {
        height: 299.14px;
    }

    .radio {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-4px);
    }
}
</style>

