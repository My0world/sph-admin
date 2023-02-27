<template>
  <div class="Spu">
    <!-- 菜单 -->
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <!-- 底部这里将来是三部分进行切换 -->
    <el-card>
      <!-- 展示SPU列表的结构 -->
      <div v-show="scene === 0">
        <!-- 添加按钮 -->
        <!-- !category3Id -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 15px 0px"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <!-- 数据展示 -->
        <el-table style="width: 100%" border :data="list">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="spu名称" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" prop="description">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              <HitButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加Sku"
                @click="addSku(row)"
              ></HitButton>
              <HitButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改Spu"
                @click="updateSpu(row)"
              ></HitButton>
              <HitButton
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="handler(row)"
                title="查看当前Spu全局Sku列表"
              ></HitButton>
              <el-popconfirm
                title="确定要删除这一段内容吗？"
                style="margin: 5px;"
                icon="el-icon-info"
                icon-color="red"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除Spu"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->

        <el-pagination
          style="margin-top: 15px; text-align: left"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[5, 7, 10]"
          layout="prev,pager,next,jumper,->,sizes,total"
          :pager-count="5"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <SpuForm
        @changeScene="changeScene"
        ref="spu"
        v-show="scene === 1"
      ></SpuForm>
      <SkuForm v-show="scene === 2" ref="sku"></SkuForm>
    </el-card>
    <el-dialog
      :title="spu.spuName + '的Sku列表'"
      :visible.sync="dialogTableVisible"
      @close="close"
    >
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          label="名称"
          width="width"
          prop="skuName"
        ></el-table-column>
        <el-table-column label="价格" align="center" width="width">
          <template slot-scope="{ row }">
            <p>
              {{ row.price + "元" }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="width"
          prop="weight"
          align="center"
        ></el-table-column>
        <el-table-column label="默认图片" align="center" width="width">
          <template slot-scope="{ row }">
            <el-image
              style="width: 120px; height: 70px"
              :src="row.skuDefaultImg"
              fit="contain"
              :preview-src-list="[row.skuDefaultImg]"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
import SpuForm from "./SpuForm/SpuForm";
import SkuForm from "./SkuForm/SkuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      //代表分页器第几页
      page: 1,
      //显示的数据
      limit: 7,
      //多少条数据
      total: 0,
      //数据
      list: [],
      //分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //0:展示SPU列表的结构 1:添加Spu|修改Spu 2:添加Sku
      scene: 0,
      //对话框的显示与隐藏
      dialogTableVisible: false,
      //spu
      spu: {},
      //存储的是sku的列表数据
      skuList: [],
      // 等待效果
      loading:true
    };
  },
  methods: {
    //三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId：获取到一、二、三级分类的id level:为了区分是几级id
      if (level === 1) {
        this.category1Id = categoryId;
        //清除2、3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        //清除三级分类id
        this.category3Id = "";
      } else {
        //代表三级id有了
        this.category3Id = categoryId;
        //获取平台属性的数据
        this.getSpuList();
      }
    },

    // 获取Spu列表方法
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$Api.spu.repSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },

    //当前点击分页器的页码时触发
    handleCurrentChange(pager) {
      this.page = pager;
      this.getSpuList();
    },

    //当前显示条数更改时触发
    handleSizeChange(size) {
      this.limit = size;
      this.getSpuList();
    },

    //添加SPU按钮的回调
    addSpu() {
      //切换到添加和更改Spu的面板
      this.scene = 1;
      //获取子组件里面的方法
      this.$refs.spu.initSpuData();
      //添加的时候子组件需要收集三级分类的id
      this.$refs.spu.spu.category3Id = this.category3Id;
    },

    //修改SPU按钮的回调
    updateSpu(row) {
      //切换到添加和更改Spu的面板
      this.scene = 1;
      //获取子组件里面的方法
      this.$refs.spu.initSpuData(row);
    },

    //切换回展示数据的面板
    changeScene(value) {
      this.scene = value.scene;
      if (value.flag === "修改") {
        this.getSpuList();
      } else if (value.flag === "添加") {
        this.page = 1;
        this.getSpuList();
      }
    },

    //删除Spu
    async deleteSpu(row) {
      let result = await this.$Api.spu.repDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message.success("删除成功");
        this.page = this.list.length < 1 ? this.page - 1 : this.page;
        if (this.page < 1) {
          this.page = 1;
        }
        this.getSpuList();
      } else {
        this.$message.error("删除失败");
      }
    },

    //添加Sku
    addSku(row) {
      //切换面板
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求---三个请求
      this.$refs.sku.initSkuData(this.category1Id, this.category2Id, row);
    },

    //查看Sku的数据的回调
    async handler(spu) {
      //点击按钮是显示对话框
      this.dialogTableVisible = true;
      //保存spu
      this.spu = spu;
      //获取Sku的列表的数据进行展示
      let result = await this.$Api.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false
      }
    },

    //对话框结束时的回调
    close(){
      //loading属性再次变为真
      this.loading = true
      //清除sku列表的数据
      this.skuList = []
    }
  },
};
</script>


<style lang="scss">
.Spu {
  .el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
}

</style>







 

