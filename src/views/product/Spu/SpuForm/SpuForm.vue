<template>
  <div class="SpuForm">
    <el-form ref="form" label-width="80px" :model="spu">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择选择品牌" v-model="spu.tmId">
          <el-option
            :label="item.tmName"
            v-for="item in tradeMarkList"
            :key="item.id"
            :value="item.id"
            >{{ item.tmName }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="5"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <!-- SPU图片上传 -->
      <!-- :on-preview="handlePictureCardPreview" :on-remove="handleRemove" -->
      <!-- 上传图片： action图片上传的地址  list-type:文件列表的类型 on-preview：图片预览的时候会触发  on-remove:当删除图片的时候会触发 -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" style="text-align: center">
          <el-image
            fit="contain"
            style="width: 570px; max-height: 100%"
            :src="dialogImageUrl"
            alt=""
          >
          </el-image>
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}+${item.name}`"
            >{{ item.name }}</el-option
          >
        </el-select>
        <el-button
          style="margin: 7px 15px"
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            width="175px"
            align="center"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <!-- el-tag:用户展示已有属性值列表的数据的 -->
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                @close="deleteSaleAttrValue(row, index)"
                closable
                :disable-transitions="false"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <!-- 底下的结构可以当做输入框和span的切换 -->
              <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" @click="showInput" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                icon="el-icon-plus"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170px" align="center">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除"
                @click="deleteAllSaleAttrValue($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div style="margin-top: 22px">
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "SpuForm",
  components: {},
  data() {
    return {
      //spu属性初始化的时候是一个空对象，在修改SPU的时候，会向服务器发请求，返回SPU信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      //添加SPU，如果是添加SPU的时候并没有向服务器发请求
      spu: {
        //三级分类id
        category3Id: 0,
        // 品牌id
        tmId: "",
        //描述
        description: "",
        // spu名称
        spuName: "",
        //收集SPU图片的信息
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "",
          //     imgUrl: "",
          //     spuId: 0,
          //   },
        ],
        // 平台属性与属性值的数组
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "",
          //         saleAttrName: "",
          //         saleAttrValueName: "",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      }, //SPU信息属性
      tradeMarkList: [], //品牌的信息
      spuImageList: [], //图片
      saleAttrList: [], //平台全部的销售属性
      attrIdAndAttrName: "", //收集未选择的属性id
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  computed: {
    // 计算出还未选择的销售属性
    // filter 返回布尔值false表示是不需要的数据
    // every 全为真才为真  一旦有一个不符合条件，则不会继续迭代下去
    // 颜色 版本 尺码
    // 颜色 版本
    // 颜色 ！= 颜色 false 最终false
    // 版本 ！= 颜色 true  版本 ！= 版本 false 最终false
    // 尺码 ！= 颜色 true  尺码 ！= 版本 true  最终true
    unSelectSaleAttr() {
      let arr = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((spuItem) => {
          return item.name != spuItem.saleAttrName;
        });
      });
      return arr;
    },
  },
  methods: {
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },

    //当删除图片时回触发
    handleRemove(file, fileList) {
      //file参数：代表的是删除的那张图片
      //fileList参数：照片墙删除某一张图片以后，剩余的图片
      //收集已有的图片【照片墙中显示的图片有name、url字段】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },

    //图片上传成功时
    handleSuccess(response, file, fileList) {
      //收集图片信息
      this.spuImageList = fileList;
    },

    //添加新的销售属性
    addSaleAttr() {
      //已经收集需要添加的销售属性的信息
      //把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split("+");
      //向SPU对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空数据
      this.attrIdAndAttrName = "";
    },

    //添加新的属性值
    addSaleAttrValue(row) {
      //点击销售属性值当中添加按钮的时候，需要有button变为input，通过当前销售属性的inputVisible控制
      //挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
      this.$set(row, "inputVisible", true);
      //通过响应式数据inputValue字段收集新增的销售属性
      this.$set(row, "inputValue", "");
      this.$nextTick(function () {
        this.$refs.saveTagInput.focus();
      });
    },

    //删除某一个属性值
    deleteSaleAttrValue(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },

    //删除某一行的属性值
    deleteAllSaleAttrValue(index) {
      this.spu.spuSaleAttrList.splice(index, 1);
    },

    // el-input失去焦点的事件
    handleInputConfirm(row) {
      //解构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性值
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue.trim(),
      };
      //不能为空
      if (newSaleAttrValue.saleAttrValueName === "") {
        row.inputVisible = false;
        return;
      }
      //不能重复 重复为假 反之为真
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != newSaleAttrValue.saleAttrValueName;
      });
      if (!result) {
        row.inputVisible = false;
        return;
      }
      //添加
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改inputVisible为false，显示button
      row.inputVisible = false;
    },

    //获取SPU信息
    async getSpu(row) {
      let result = await this.$Api.spu.repSpu(row.id);
      if (result.code == 200) {
        //在修改spu的时候，需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
        this.spu = result.data;
      } else {
        this.$message.error(result.message);
      }
    },

    //获取品牌的信息
    async getTradeMarkList() {
      let result = await this.$Api.spu.repTradeMarkList();
      if (result.code == 200) {
        this.tradeMarkList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },

    //获取品牌的信息
    async getSpuImageList(row) {
      let result = await this.$Api.spu.repSpuImageList(row.id);
      if (result.code == 200) {
        let listArr = result.data;
        //由于照片墙展示图片的数据需要数组，数组里面的元素需要有name与url字段
        //需要把服务器的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      } else {
        this.$message.error(result.message);
      }
    },

    //获取平台全部的销售属性
    async getSaleAttrList() {
      let result = await this.$Api.spu.repBaseSaleAttrList();
      if (result.code == 200) {
        this.saleAttrList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },

    //初始化SpuForm数据
    initSpuData(row) {
      //清理旧的数据
      //Object.assign:es6新增的方法可以合并对象
      //组件实例this._data，可以操作data当中响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
      //获取品牌的信息
      this.getTradeMarkList();
      //获取平台全部的销售属性
      this.getSaleAttrList();
      if (row) {
        //获取SPU信息
        this.getSpu(row);
        //获取SPU图片
        this.getSpuImageList(row);
      }
    },

    //修改和保存Spu
    addOrUpdateSpu() {
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片，需要携带imgName,imgUrl
      let { spu, spuImageList } = this;
      spu.spuImageList = spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.imgUrl,
        };
      });
      //如果有id表示修改，没有表示添加
      if (spu.id) {
        //修改Spu
        this.updateSpu(spu);
      } else {
        //添加Spu
        this.addSpu(spu);
      }
    },

    //修改Spu
    async updateSpu(spu) {
      let result = await this.$Api.spu.repUpdateSpu(spu);
      if (result.code == 200) {
        //提示信息
        this.$message.success("修改成功");
        //更新数据（用$parent的方法）
        this.$parent.$parent.getSpuList();
        //更改面板（用$parent的方法）
        this.$parent.$parent.scene = 0;
      } else {
        this.$message.error("修改失败");
      }
    },

    //添加Spu
    async addSpu(spu) {
      let result = await this.$Api.spu.repAddSpu(spu);
      if (result.code == 200) {
        //提示信息
        this.$message.success("保存成功");
        //更改面板
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      } else {
        this.$message.error("保存失败");
      }
    },

    //取消按钮
    cancel() {
      //通知切换面板
      this.$emit("changeScene", { scene: 0 });
    },
  },
};
</script>


<style>
.SpuForm {
}
.el-form-item__label {
  text-align: left;
}
</style>

