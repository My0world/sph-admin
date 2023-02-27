<template>
    <el-card>
        <div class="card-header">
            <span>{{ title }}</span>
            <i class="el-icon-info"></i>
        </div>
        <div class="card-content">
            <span>{{ count }}</span>
        </div>
        <div class="card-charts">
            <slot name="chart">

            </slot>
        </div>
        <div class="card-footer">
            <slot name="footer">

            </slot>
        </div>
    </el-card>
</template>


<script>
export default {
    name: "Detail",
    props: ["title", 'count'],
    data() {
        return {}
    },
    methods: {},
    mounted() {
        
    },
}
</script>


<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span,
    i {
        color: rgb(195, 193, 193);
        font-size: 15px;
    }
}

.card-content {
    margin: 7px 0px;

    span {
        font-size: 25px;
        font-weight: 520;
    }
}

.card-charts {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 57px;
    margin: 7px 0px;
}

.card-footer {
    padding-top: 7px;
    font-size: 15px;
    border-top: 1px solid rgba(195, 193, 193, 0.3);
}
</style>>

