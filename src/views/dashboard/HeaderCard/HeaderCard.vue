<template>
    <div class="HeaderCard">
        <el-row :gutter="30">
            <el-col :span="6">
                <Detail title="总销售额" :count="'￥' + 1235">
                    <template slot="chart">
                        <div class="text">
                            <span>周同比 &nbsp; 56.67% <i class="el-icon-caret-top" style="color: red;"></i></span>
                            <span>日同比 &nbsp; 56.67% <i class="el-icon-caret-bottom" style="color: greenyellow;"></i></span>
                        </div>
                    </template>
                    <template slot="footer">
                        <span>
                            日销售额￥252
                        </span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="访问量" :count="518158">
                    <template slot="chart">
                        <lineChart></lineChart>
                    </template>
                    <template slot="footer">
                        <span>
                            日访问量252
                        </span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="支付笔数" :count="2505">
                    <template slot="chart">
                        <barChart></barChart>
                    </template>
                    <template slot="footer">
                        <span>
                            转化率64%
                        </span>
                    </template>
                </Detail>
            </el-col>
            <el-col :span="6">
                <Detail title="运营活动效果" :count="75 + '%'">
                    <template slot="chart">
                        <progressChart></progressChart>
                    </template>
                    <template slot="footer">
                        <div class="text2">
                            <span>周同比 &nbsp; 12% <i class="el-icon-caret-top" style="color: red;"></i></span>
                            <span>日同比 &nbsp; 11% <i class="el-icon-caret-bottom" style="color: greenyellow;"></i></span>
                        </div>
                    </template>
                </Detail>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import lineChart from './lineChart/lineChart';
import Detail from './Detail/Detail';
import barChart from './barChart/barChart';
import progressChart from './progressChart/progressChart';

export default {
    name: "HeaderCard",
    components: {
        lineChart,
        Detail,
        barChart,
        progressChart
    },
    data() {
        return {}
    },

    methods: {}
}
</script>


<style lang="scss" scoped>
.text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 15px;
    }
}
.text2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 15px;
    }
}
</style>

