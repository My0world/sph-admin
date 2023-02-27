<template>
    <div class="Observe">
        <el-row :gutter="30">
            <el-col :span="12">
                <Search></Search>
            </el-col>
            <el-col :span="12">
                <Category></Category>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import Search from './Search/Search';
import Category from './Category/Category';
export default {
    name: "Observe",
    components: {
        Search,
        Category
    },
    data() {
        return {}
    },

    methods: {}
}
</script>


<style>
.Observe {}
</style>

