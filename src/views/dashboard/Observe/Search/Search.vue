<template>
    <div class="Search">
        <el-card>
            <div slot="header" class="clearfix">
                <span style=" color: #c3c1c1;font-size: 15px;">线上热门搜索</span>
                <el-dropdown style="position: absolute; top: 0; right: 0;" szie="mini">
                    <a class="el-dropdown-link" style="color: #000;">
                        <i class="el-icon-more"></i>
                    </a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div>
                <el-row>
                    <el-col :span="12">
                        <lineChart></lineChart>
                    </el-col>
                    <el-col :span="12">
                        <lineChart></lineChart>
                    </el-col>
                </el-row>
            </div>
            <div class="footer">
                <el-table :data="[]" style="width: 100%" border="">
                    <el-table-column label="排名" width="60" align="center">
                    </el-table-column>
                    <el-table-column label="搜索关键字" width="width">
                    </el-table-column>
                    <el-table-column label="用户数" sortable width="width">
                    </el-table-column>
                    <el-table-column label="周涨幅" sortable width="width">
                    </el-table-column>
                </el-table>
                <el-pagination background layout="->,prev, pager, next" :total="1000" :small="true" >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>


<script>
import lineChart from './lineChart/lineChart'
export default {
    name: "Search",
    data() {
        return {}
    },
    components: {
        lineChart
    },
    methods: {}
}
</script>


<style lang="scss" scoped>
.Search {
    ::v-deep .clearfix {
        position: relative;
    }

    .footer {
        margin: 0px 15px;
    }
    ::v-deep .el-pagination{
        padding: 5px 0px !important;
        .btn-next{
            margin-right: 0px;
        }
    }
}
</style>>

