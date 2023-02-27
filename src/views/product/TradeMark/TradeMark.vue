<template>
  <div class="TradeMark">
    <el-card style="margin: 20px 0px">
      <!-- 按钮 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin: 10px 0px"
        size="mini"
        @click="addTradeMark"
        >添加</el-button
      >

      <!-- 
        表格组件
        data：表格组件将来展示的数据---数据类型
        border：是给表格添加边框
        column：属性
        label：标题
        width：宽度
        align：对齐方式
        prop:对应列内容的字段名
        注意1：elementUI的Table组件展示的数据是一列一列展示的
    -->
      <el-table :data="list" style="width: 100%" border>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tmName"
          label="品牌名词"
          width="width"
        ></el-table-column>
        <el-table-column prop="logoUrl" label="品牌logo" width="width">
          <template slot-scope="{ row }">
            <el-image
              :src="row.logoUrl"
              style="width: 70px; height: 70px"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="updateTradeMark(row)"
              >修改
            </el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteTradeMark(row)"
              >删除
            </el-button>
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
    </el-card>

    <!-- 
      对话框 
      visible.:显示与隐藏
      From组件提供了表单验证的功能，只需要通过rules属性传入约定的验证规则，并将Form-Item的prop属性设置为需校验的字段名即可
    -->
    <el-dialog
      :title="!tmForm.id ? '添加品牌' : '修改品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 
        form表单
        :model属性，这个属性的作用是，把表单的数据收集到对象身上，将来表单验证，也需要这个数据
      -->
      <el-form :rules="rules" :model="tmForm" ref="ruleForm">
        <el-form-item label="品牌名称：" label-width="100px" prop="tmName">
          <el-input
            autocomplete="off"
            size="small"
            style="width: 70%"
            v-model="tmForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌logo：" label-width="100px" prop="logoUrl">
          <!-- 
            这里收集数据，不能用v-model，因为不是表单元素
            action:设置图片上传的地址
            before-upload:图片上传之前的回调
            on-success:图片上传后的回调
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-image
              fit="contain"
              v-if="tmForm.logoUrl"
              :src="tmForm.logoUrl"
              class="avatar"
            ></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrupdata">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { resolve } from "path";

export default {
  name: "TradeMark",
  components: {},
  data() {
    var validateTmName = (rule, value, callback) => {
      if (value.trim().length < 2 || value.trim().length > 10) {
        callback(new Error("长度在 2 到 10 个字符"));
      } else {
        callback();
      }
    };
    return {
      //代表分页器第几页
      page: 1,
      //显示的数据
      limit: 7,
      //数据
      list: [],
      //多少条数据
      total: 0,
      // // 上传图片的链接
      // imageUrl: "",
      //对话框显示
      dialogFormVisible: false,
      // 表单数据,对象身上的属性，不能瞎写，要看文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        //品牌名称验证规则
        // required:必填字段 message:提示信息 trigger:用户行为设置（事件的设置blur、change）min:最小值 max:最大值
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        //品牌logo验证规则
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  computed: {},
  methods: {
    //获取品牌列表数据
    async getPageList() {
      //获取品牌列表数据接口
      const { page, limit } = this;
      let result = await this.$Api.tradeMark.repTradeMarkList(page, limit);
      if (result.code === 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      } else {
        alert("异常");
      }
    },

    //当改变当前页的页码时触发
    handleCurrentChange(pager) {
      this.page = pager;
      this.getPageList();
    },

    //当改变每页显示的条数时触发
    handleSizeChange(size) {
      this.limit = size;
      this.getPageList();
    },

    //点击显示添加对话框
    addTradeMark() {
      //显示对话框
      this.dialogFormVisible = true;
      //清空数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },

    //点击显示修改对话框
    updateTradeMark(row) {
      //显示对话框
      this.dialogFormVisible = true;
      //将已有的品牌信息赋值给tmForm进行展示
      //将服务器返回的信息，直接赋值给了tmForm进行展示
      //也就是tmForm存储即为服务器返回品牌信息
      this.tmForm = { ...row };
    },

    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res:上传成功返回的数据
      //file:同上，但是数据会多了一些，比如图片大小等
      //收集品牌图片数据，因为将来需要带给服务器
      this.tmForm.logoUrl = res.data;
    },

    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && !isPNG && isLt2M;
    },

    // 添加品牌|修改品牌
    addOrupdata() {
      //当全部验证字段通过后，再去发请求
      this.$refs.ruleForm.validate(async (success) => {
        // 如果全部字段验证成功后
        if (success) {
          this.dialogFormVisible = false;
          // 如果有id的话
          if (this.tmForm.id) {
            //修改
            let result = await this.$Api.tradeMark.repUpdataTradeMark(
              this.tmForm
            );
            if (result.code == 200) {
              this.$message.success("修改数据成功");
              this.getPageList();
            } else {
              this.$message.success("修改数据异常");
            }
          } else {
            //添加
            let result = await this.$Api.tradeMark.repAddTradeMark(this.tmForm);
            if (result.code == 200) {
              this.$message.success("添加数据成功");
              this.getPageList();
            } else {
              this.$message.success("添加数据异常");
            }
          }
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },

    //删除品牌
    deleteTradeMark(row) {
      //弹窗
      this.$confirm(`你确定要删除品牌：${row.tmName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮时会触发
          //向服务器发请求
          let result = await this.$Api.tradeMark.repDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message.success("删除数据成功");
            this.page = this.list.length > 1 ? this.page : this.page - 1;
            this.getPageList();
          } else {
            this.$message.error("删除数据异常");
          }
        })
        .catch(() => {
          //当用户点击取消按钮时会触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  //组件挂载完毕发送请求
  mounted() {
    //获取列表数据的方法
    this.getPageList();
  },
  beforeDestroy() {},
};
</script>


<style>
.el-form-item__label {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>