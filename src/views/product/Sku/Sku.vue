<template>
  <div class="Sku">
    <el-card style="margin: 20px 0px">
      <!-- 表格 -->
      <el-table :data="list" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
        <el-table-column label="默认图片" width="250">
          <template slot-scope="{ row }">
            <el-image style="width: 200px; height: 100px" fit="contain" :src="row.skuDefaultImg"
              :preview-src-list="[row.skuDefaultImg]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(KG)" align="center" width="150">
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" align="center" width="150">
        </el-table-column>
        <el-table-column align="center" width="250" label="操作">
          <template slot-scope="{ row }">
            <!-- 当前为上架状态 -->
            <el-button v-if="row.isSale == 1" size="mini" type="success" icon="el-icon-top" title="切换为下架状态"
              @click="cancelSale(row)"></el-button>
            <!-- 当前为下架状态 -->
            <el-button v-else size="mini" type="warning" icon="el-icon-bottom" title="切换为上架状态"
              @click="onSale(row)"></el-button>
            <!-- 获取详情信息 -->
            <el-button size="mini" type="info" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
            <!-- 删除Sku -->
            <el-popconfirm icon="el-icon-info" icon-color="red" title="确定要删除这个Sku吗？" @onConfirm="deleteSku(row)">
              <el-button style="margin-left: 10px;" size="mini" type="danger" icon="el-icon-delete"
                slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 
      分页器
      total：一个多少条
      current-page：当前第几页
      page-size：每一页显示多少条
      page-sizes：每一页显示多少条
      layout：布局
      pager-count：按钮数量(如果按钮数量是5，那连续的页码数是3)
     -->
      <el-pagination style="margin-top: 15px; text-align: left" :total="total" :current-page="page" :page-size="limit"
        :page-sizes="[5, 7, 10]" layout="prev,pager,next,jumper,->,sizes,total" :pager-count="5"
        @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
    </el-card>

    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="showDrawer" size="50%">
      <el-row style="width: 70%">
        <el-col :span="5">
          <div class="grid-content" style="text-align: left; font-size: 20px; font-weight: bolder">
            名称:
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" style="font-size: 15px; line-height: 23px; word-break: break-all">
            {{ skuInfo.skuName }}
          </div>
        </el-col>
      </el-row>
      <el-row style="width: 70%">
        <el-col :span="5">
          <div class="grid-content" style="text-align: left; font-size: 20px; font-weight: bolder">
            描述:
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" style="font-size: 15px; line-height: 23px; word-break: break-all">
            {{ skuInfo.skuDesc }}
          </div>
        </el-col>
      </el-row>
      <el-row style="width: 70%">
        <el-col :span="5">
          <div class="grid-content" style="text-align: left; font-size: 20px; font-weight: bolder">
            价格:
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" style="font-size: 15px; line-height: 23px; word-break: break-all">
            {{ skuInfo.price }}元
          </div>
        </el-col>
      </el-row>
      <el-row style="width: 70%">
        <el-col :span="5">
          <div class="grid-content" style="text-align: left; font-size: 20px; font-weight: bolder">
            平台属性:
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-tag style="margin-right: 7px; margin-bottom: 5px" v-for="item in skuInfo.skuAttrValueList"
              :key="item.id">{{ item.attrName + "--" + item.valueName }}</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row style="width: 70%">
        <el-col :span="5">
          <div class="grid-content" style="text-align: left; font-size: 20px; font-weight: bolder">
            商品图片:
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-carousel height="220px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <el-image style="width: 270px; height: 200px" fit="cover" :src="item.imgUrl"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>


<script>
import { throttle } from "lodash";
export default {
  name: "Sku",
  components: {},
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 7, //代表当前页面有几条数据
      total: 0, //存储分页器一共展示的数据
      list: [], //存储sku列表的数据
      skuInfo: {}, //sku详情信息
      showDrawer: false, //抽屉效果的显示与隐藏
    };
  },
  methods: {
    // 获取Sku列表
    async getSkuList() {
      //发请求
      let result = await this.$Api.sku.reqSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },

    // currentPage 改变时会触发
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },

    // pageSize 改变时会触发
    handleSizeChange(size) {
      this.limit = size;
      this.getSkuList();
    },

    //下架
    cancelSale: throttle(async function (row) {
      let result = await this.$Api.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message.success(`${row.skuName}已下架`);
        this.getSkuList();
      } else {
        this.$message.error(`${row.skuName}下架失败`);
      }
    }, 700),

    //上架
    onSale: throttle(async function (row) {
      let result = await this.$Api.sku.reqOnSale(row.id);
      if (result.code == 200) {
        this.$message.success(`${row.skuName}已上架`);
        this.getSkuList();
      } else {
        this.$message.error(`${row.skuName}上架失败`);
      }
    }, 700),

    //获取Sku详情
    async getSkuInfo(sku) {
      let result = await this.$Api.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.showDrawer = true;
        this.skuInfo = result.data;
      }
    },

    //删除Sku
    async deleteSku(row){
      let result = await this.$Api.sku.reqDeleteSku(row.id)
      if(result.code == 200){
        this.$message.success("删除sku成功")
        if(this.list.length > 1){
          this.page = this.page
        }else{
          this.page = this.page - 1
        }
        this.getSkuList()
      }else{
        this.$message.error("删除sku失败")
      }
    }
  },
  mounted() {
    this.getSkuList();
  },
};
</script>


<!-- 加了 scoped不可以 -->
<!-- 要用scoped的话，需加::v-deep -->
<style  lang="scss" scoped>
.Sku {
  .el-col {
    margin: 10px 10px;
  }

  ::v-deep.el-drawer__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ::v-deep.el-carousel__item {
    background: rgba($color: #409EFF, $alpha: 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep.el-carousel__button {
    background-color: #409EFF;
    height: 5px;
  }
}
</style>

