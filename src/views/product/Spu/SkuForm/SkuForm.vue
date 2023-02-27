<template>
  <div class="SkuForm">
    <el-form ref="form" label-width="115px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称：">
        <div style="padding: 0 15px">{{ spu.spuName }}</div>
      </el-form-item>
      <!-- SKU名称 -->
      <el-form-item label="SKU名称：">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <!-- 价格（元） -->
      <el-form-item label="价格（元）：">
        <el-input
          placeholder="价格（元）"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <!-- 重量（千克） -->
      <el-form-item label="重量（千克）：">
        <el-input
          placeholder="重量（千克）"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <!-- 规格描述 -->
      <el-form-item label="规格描述：">
        <el-input
          type="textarea"
          rows="5"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性：">
        <el-form :inline="true" label-width="90px" size="small">
          <el-form-item
            v-for="attr in attrInfoList"
            :key="attr.id"
            :label="attr.attrName + '：'"
          >
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 销售属性 -->
      <el-form-item label="销售属性：">
        <el-form :inline="true" label-width="90px" size="small">
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName + '：'"
          >
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 图片列表 -->
      <el-form-item label="图片列表：">
        <el-table
          :data="spuImageList"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            width="50"
            prop=""
            label=""
          ></el-table-column>
          <el-table-column prop="imgUrl" label="图片" width="width">
            <template slot-scope="{ row }">
              <el-image
                style="width: 120px; height: 70px"
                :src="row.imgUrl"
                fit="contain"
                :preview-src-list="[row.imgUrl]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width"
          ></el-table-column>
          <el-table-column prop="" label="操作" align="center" width="width">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.isDefault == 0"
                size="mini"
                type="primary"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else size="mini">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div style="margin-top: 22px">
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售属性的数据
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //收集是sku数据的字段
      skuInfo: {
        // 第一大类，父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二大类，需要通过数据双向绑定v-model收集
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        // 第三大类，需要自己书写代码
        // 默认图片
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      //spu数据
      spu: {},
      //收集图片数据字段：但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
      imageList: [],
    };
  },
  components: {},
  methods: {
    // 获取图片的数据
    async getSpuImageList(id) {
      let result = await this.$Api.spu.repSpuImageList(id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
    },

    //获取销售属性的数据
    async getSpuSaleAttrList(id) {
      let result = await this.$Api.spu.repSpuSaleAttrList(id);
      if (result.code == 200) {
        this.spuSaleAttrList = result.data;
      }
    },

    //获取平台属性的数据
    async getAttrInfoList(category1Id, category2Id, category3Id) {
      let result = await this.$Api.spu.repAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrInfoList = result.data;
      }
    },

    // 初始化SkuForm数据
    initSkuData(category1Id, category2Id, spu) {
      //收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片的数据
      this.getSpuImageList(spu.id);
      // 获取销售属性的数据
      this.getSpuSaleAttrList(spu.id);
      // 获取平台属性的数据
      this.getAttrInfoList(category1Id, category2Id, spu.category3Id);
    },

    // table表格复选框按钮的事件
    handleSelectionChange(selection) {
      //获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
      this.imageList = selection;
    },

    //设置默认图片的操作
    changeDefault(row) {
      //图片列表的数据的isDefault字段变为0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      //点击的那个图片的数据变为1
      row.isDefault = 1;

      this.skuInfo.skuDefaultImg = row.imgUrl;
    },

    //取消按钮
    cancel() {
      this.$parent.$parent.scene = 0;
      Object.assign(this._data, this.$options.data());
    },

    // 保存按钮
    async save() {
      // 整理参数
      const { attrInfoList, spuSaleAttrList, imageList, skuInfo } = this;
      // 整理平台属性
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      //整理图片数据
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      //发请求
      let result = await this.$Api.spu.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message.success("添加sku成功");
        Object.assign(this._data, this.$options.data());
        this.$parent.$parent.scene = 0;
      } else {
        this.$message.error("添加sku失败");
      }
    },
  },
};
</script>


<style lang="scss">
.SkuForm {
  .el-form .el-form--inline {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item .el-form-item--small {
    display: flex;
    align-items: center;
    height: 40px;
    .el-form-item__label {
      font-size: 10px;
      font-weight: 500;
      color: black;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .el-form-item__content {
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

