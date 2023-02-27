<template>
    <div class="Sale">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 左侧内容 -->
                <el-tabs v-model="activeName">
                    <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                    <el-tab-pane label="访问量" name="visits"></el-tab-pane>
                </el-tabs>
                <!-- 右侧内容 -->
                <div class="date">
                    <span @click="setDay">今日</span>
                    <span @click="setWeek">本周</span>
                    <span @click="setMonth">本月</span>
                    <span @click="setYear">本年</span>
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="date" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <el-row :gutter="10">
                <el-col :span="19">
                    <!-- 容器 -->
                    <div class="charts" ref="charts"></div>
                </el-col>
                <el-col :span="5">
                    <div class="tabel">
                        <h3>门店{{ title }}排名</h3>
                        <ul>
                            <li>
                                <span class="rIndex spe">1</span>
                                <span>肯德基</span>
                                <span>35525</span>
                            </li>
                            <li>
                                <span class="rIndex spe">2</span>
                                <span>麦当劳</span>
                                <span>36418</span>
                            </li>
                            <li>
                                <span class="rIndex spe">3</span>
                                <span>银记肠粉店</span>
                                <span>268256</span>
                            </li>
                            <li>
                                <span class="rIndex">4</span>
                                <span>汉堡王</span>
                                <span>85964</span>
                            </li>
                            <li>
                                <span class="rIndex">5</span>
                                <span>真功夫</span>
                                <span>12384</span>
                            </li>
                            <li>
                                <span class="rIndex">6</span>
                                <span>杨德福</span>
                                <span>58569</span>
                            </li>
                            <li>
                                <span class="rIndex">7</span>
                                <span>华莱士</span>
                                <span>75482</span>
                            </li>
                        </ul>
                    </div>

                </el-col>
            </el-row>
        </el-card>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import dayjs from "dayjs";
export default {
    name: "Sale",
    data() {
        return {
            activeName: 'sale',
            Chart: null,
            //收集日历数据
            date: []
        }
    },
    computed: {
        ...mapState("home", ["data"]),
        title() {
            return this.activeName === 'sale' ? "销售额" : "访问量"
        }
    },
    //监听属性
    watch: {
        title: {
            immediate: true,
            //重新修改图表的配置数据
            //图表配置数据可以再次修改，如果有新的数值用新的，没有就用旧的
            handler() {
                this.$nextTick(() => {
                    this.Chart.setOption({
                        title: {
                            text: this.title + "趋势",
                        },
                        series: [
                            {
                                name: this.title + ':',
                                data: this.title == "销售额" ? this.data.orderFullYear : this.data.userFullYear,
                            }
                        ],
                        xAxis: {
                            data: this.title == "销售额" ? this.data.orderFullYearAxis : this.data.userFullYearAxis
                        }
                    })
                })

            }


        },
        data() {
            this.Chart.setOption({

                series: [
                    {
                        data: this.title == "销售额" ? this.data.orderFullYear : this.data.userFullYear,
                    }
                ],
                xAxis: {
                    data: this.title == "销售额" ? this.data.orderFullYearAxis : this.data.userFullYearAxis
                }
            })
        }



    },
    methods: {
        // 本天
        setDay() {
            let day = dayjs().format("YYYY-MM-DD")
            this.date = [day, day]
        },
        // 本周
        setWeek() {
            let start = dayjs().day(1).format("YYYY-MM-DD")
            let end = dayjs().day(7).format("YYYY-MM-DD")
            this.date = [start, end]
        },
        // 本月
        setMonth() {
            let start = dayjs().startOf("month").format("YYYY-MM-DD")
            let end = dayjs().endOf("month").format("YYYY-MM-DD")
            this.date = [start, end]
        },
        // 本年
        setYear() {
            let start = dayjs().startOf("year").format("YYYY-MM-DD")
            let end = dayjs().endOf("year").format("YYYY-MM-DD")
            this.date = [start, end]
        }
    },
    mounted() {
        //初始化echarts实例
        this.Chart = this.echarts.init(this.$refs.charts)
        this.Chart.setOption({
            title: {
                left: '2%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                }
            ],
            media: [{
                query: {
                    minWidth: 600,
                    maxHeight: 600
                }
            }]
        })
    },
}
</script>


<style lang="scss" scoped>
.Sale {
    margin: 20px 0px;

    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
        width: 230px;
    }

    ::v-deep.el-card__body {
        padding: 5px 20px 18px 20px !important;
    }

    ::v-deep.el-card__header {
        border: none;
        position: relative;
    }


    .clearfix {

        .date {
            position: absolute;
            top: 18px;
            right: 20px;
            display: flex;
            align-items: center;

            span {
                display: block;
                width: 62px;
                height: 40px;
                font-size: 14px;
                font-weight: 500;
                color: #303133;
                text-align: center;
                line-height: 40px;
            }
        }

    }

    .charts {
        width: 100%;
        height: 350px;
    }

    .tabel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
            padding-top: 1.5px;
            margin: 0;
        }

        ul {
            list-style: none;
            width: 100%;
            height: 300px;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        ul li {
            height: 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        li span:nth-of-type(2) {
            width: 55%;
        }

        li span:nth-of-type(3) {
            width: 30%;
        }

        .rIndex {
            width: 20px;
            height: 20px;

            text-align: center;
            line-height: 21px;
        }

        .spe {
            border-radius: 20px;
            color: white;
            background: black;
        }
    }
}
</style>

