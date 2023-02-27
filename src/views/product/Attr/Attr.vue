<template>
  <div class="Attr">
    <!-- 菜单 -->
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelect>
    </el-card>

    <!-- 添加与更新面板、展示数据面板 -->
    <el-card>
      <!-- 展示数据 -->
      <div v-show="isShowTable">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          style="margin: 15px 0px"
          >添加</el-button
        >
        <!-- 数据展示 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="i in row.attrValueList"
                :key="i.id"
                size="small"
                style="margin: 5px 7px 5px 0px"
                >{{ i.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
                style="margin: 0px 5px;"
                >修改
              </el-button>
              <el-popconfirm
                title="确定要删除这一段内容吗？"
                @onConfirm="deleteAttr(row)"
                icon="el-icon-info"
                iconColor="red"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  style="margin: 0px 5px;"
                  >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名：">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 22px">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!attrInfo.attrName"
            >添加属性值</el-button
          >
          <el-button @click="isShowTable = !isShowTable">取消</el-button>
        </div>
        <el-table style="width: 100%" border :data="attrInfo.attrValueList">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                :autofocus="false"
                @blur="toLook(row)"
                @keyup.enter.native="toLook(row)"
                :ref="$index"
              ></el-input>
              <p v-else @click="toEdit(row, $index)">{{ row.valueName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="width">
            <template slot-scope="{ $index }">
              <el-popconfirm
                title="确定要删除这一段内容吗？"
                icon="el-icon-info"
                icon-color="red"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 22px">
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="addorUpdateAttr"
            >保存</el-button
          >
          <el-button @click="isShowTable = !isShowTable">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  components: {},
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性字段
      attrList: [],
      //这个属性是控制表格显示与隐藏
      isShowTable: true,
      //收集新增属性|修改属性使用的
      attrInfo: {
        id: undefined,
        attrName: "", //属性名
        attrValueList: [], //属性值 属性值可以有多个，每一个属性值是对象
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也要区分几级id
      },
    };
  },
  computed: {
    isDisabled() {
      return (
        this.attrInfo.attrValueList.length < 1 ||
        this.attrInfo.attrValueList[this.attrInfo.attrValueList.length - 1]
          .valueName == ""
      );
    },
  },
  methods: {
    //自定义事件回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id，以及父组件进行存储
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //代表三级id有了
        this.category3Id = categoryId;
        //获取平台属性的数据
        this.getAttrList();
      }
    },

    //获取平台属性的数据
    async getAttrList() {
      let result = await this.$Api.attr.repAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    //添加属性值回调
    addAttrValue() {
      //向属性值的数组里面添加元素
      // attrId:是你相应的属性的id,目前而已我们是添加属性的操作,还没有相应的属性的id,目前而言带给服务器的id为undefined
      // valueName:相应属性值的名称
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        valueName: "",
        // flag属性：每一个属性值添加一个标记flag,用户切换查看模式与编辑模式,好处,每一个属性值可以控制自己的模式切换
        // 当前flag属性，响应式数据（数据变化视图跟着变化）
        flag: true,
      });
      //使数组新添加的元素在编辑时自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    //添加属性按钮的回调
    addAttr() {
      //显示添加|修改的页面
      this.isShowTable = !this.isShowTable;
      //对数据进行清空
      this.attrInfo.attrName = "";
      this.attrInfo.attrValueList = [];
      this.attrInfo.categoryId = this.category3Id;
      this.attrInfo.categoryLevel = 3;
      this.attrInfo.id = undefined;
    },

    //修改属性按钮的回调
    updateAttr(row) {
      //显示添加|修改的页面
      this.isShowTable = !this.isShowTable;
      //将要修改的属性赋值给attrInfo
      //拓展运算符就是浅拷贝，一级深度除外
      //由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决这类问题
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性值元素添加上flag这个标志
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag，但是会发现视图不会跟着变化（因为flag不是响应式）
        //因为Vue无法探测普通的新增属性，这样书写的属性并不是响应式属性（数据变化视图跟着变）
        //第一个是参数，第二个是添加新的响应式属性的属性名，第三个是响应式属性的属性名的数据
        this.$set(item, "flag", false);
      });
    },

    //切换查看模式
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请输入正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row是新增的属性值【数组的最后一项元素】
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (isRepat) return;
      //row：形参是当前用户添加的最新的属性值
      //当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },

    // 切换编辑模式
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而已，页面重绘和重拍是耗时间的
      //点击span的时候，重绘重排一个input是需要耗费时间，因此我们不可能一点击span立马获取input
      //$nextTick，当节点渲染完成了，会执行一次
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },

    //气泡确认框确认删除按钮的回调
    //记住当前版本为2.13.2，最新文档为2.15.11要改
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },

    //保存数据发请求
    async addorUpdateAttr() {
      //整理参数：1.如果用户添加很多属性值，且属性为空的不应该提交给服务器
      //提交服务器的数据不应该有flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤掉属性值为空的数据
          if (item.valueName !== "") {
            //删除flag字段
            delete item.flag;
            //true表示要的数据
            return true;
          }
        }
      );
      //发请求
      let result = await this.$Api.attr.reqAddorUpdateAttr(this.attrInfo);
      // 成功返回200
      if (result.code == 200) {
        //提示保存成功
        this.$message.success("保存成功");
        //获取新的数据
        this.getAttrList();
        //展示数据的面板显示
        this.isShowTable = !this.isShowTable;
      } else {
        //提示失败
        this.$message.error(result.message);
      }
    },

    // 删除属性
    async deleteAttr(row){
      let result = await this.$Api.attr.reqDeleteAttr(row.id)
      if(result.code == 200){
        this.$message.success("删除成功")
        this.getAttrList();
      }else{
        this.$message.error("删除失败")
      }

    }
  },
};
</script>


<style>
.Attr {
}
.el-form-item__label {
  text-align: left;
}
</style>

