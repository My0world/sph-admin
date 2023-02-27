<template>
  <div class="CategorySelect">
    <!-- inline：代表行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            v-for="i in list1"
            :key="i.id"
            :label="i.name"
            :value="i.id"
            >{{ i.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            v-for="i in list2"
            :key="i.id"
            :label="i.name"
            :value="i.id"
            >{{ i.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            v-for="i in list3"
            :key="i.id"
            :label="i.name"
            :value="i.id"
            >{{ i.name }}</el-option
          >
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "CategorySelect",
  props:["show"],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  components: {},
  methods: {
    // 获取一级分类
    async getCategory1List() {
      let result = await this.$Api.attr.repCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },

    // 获取二级分类
    async handler1() {
      // 清除二、三级数据，再获取
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      // 向父组件发送一级分类的id
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category1Id,
        level: 1,
      });
      //拿数据
      let result = await this.$Api.attr.repCategory2List(
        this.cForm.category1Id
      );
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },

    // 获取三级分类
    async handler2() {
      // 清除三级数据，再获取
      this.list3 = [];
      this.cForm.category3Id = "";
      // 向父组件发送一级分类的id
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category2Id,
        level: 2,
      });
      // 拿数据
      let result = await this.$Api.attr.repCategory3List(
        this.cForm.category2Id
      );
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },

    // 三级分类id的处理
    handler3() {
      // 向父组件发送一级分类的id
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category3Id,
        level: 3,
      });
    },
  },
  mounted() {
    this.getCategory1List();
  },
};
</script>


<style>
.CategorySelect {
}
</style>

