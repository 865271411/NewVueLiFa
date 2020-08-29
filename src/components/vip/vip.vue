<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收银台</el-breadcrumb-item>
      <el-breadcrumb-item>开卡</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 600px">
        <el-form-item label="会员卡号：" prop="vipId">
          <el-input v-model="form.vipId" placeholder="请输入会员卡号"/>
        </el-form-item>
        <el-form-item label="客户姓名：" prop="vipName">
          <el-input v-model="form.vipName" placeholder="请输入客户姓名"/>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>
        <el-form-item label="卡的类型：" prop="cardId">
          <el-select v-model="form.cardId" placeholder="请选择卡的类型" style="width: 100%">
            <el-option
              v-for="item in cardTypeList"
              :key="item.cardId"
              :label="item.cardName"
              :value="item.cardId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡上余额：" prop="cardMoney">
          <el-input-number v-model="form.cardMoney" :precision="2" :step="0.1" :min="0" :max="10" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="消费总额：" prop="consumeMoney">
          <el-input-number v-model="form.consumeMoney" :precision="2" :step="0.1" :min="0" :max="10" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="所属职工：" prop="empId">
          <el-select v-model="form.empId" placeholder="请选择所属职工" style="width: 100%">
            <el-option
              v-for="item in empList"
              :key="item.empId"
              :label="item.empName"
              :value="item.empId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import request from '@/utils/request'
  export default {
    name: "Vip",
    data() {
      return {
        cardTypeList: [],
        empList: [],
        // 表单参数
        form: {
          cardMoney: 0.00,
          consumeMoney: 0.00,
        },
        // 表单校验
        rules: {
          vipId: [
            {required: true, message: "会员卡号不能为空", trigger: "blur"}
          ],
          vipName: [
            {required: true, message: "姓名不能为空", trigger: "blur"}
          ],
          phone: [
            {required: true, message: "手机号码不能为空", trigger: "blur"}
          ],
          cardId: [
            {required: true, message: "卡的类型不能为空", trigger: "blur"}
          ],
          cardMoney: [
            {required: true, message: "卡上余额不能为空", trigger: "blur"}
          ],
          consumeMoney: [
            {required: true, message: "消费总额不能为空", trigger: "blur"}
          ],
          empId: [
            {required: true, message: "职工不能为空", trigger: "blur"}
          ],
        }
      };
    },
    created() {
      this.getCardTypeList();
      this.getEmpList();
    },
    methods: {
      /** 开卡类型列表 */
      getCardTypeList() {
        request({
          url: '/cardType/list',
          method: 'get',
        }).then(response => {
          this.cardTypeList = response.data;
        });
      },
      /** 职工列表 */
      getEmpList() {
        request({
          url: '/emp/list',
          method: 'get',
        }).then(response => {
          this.empList = response.data;
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            request({
              url: '/vip/add',
              method: 'post',
              data: this.form
            }).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: response.msg,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.msg,
                  type: 'error'
                });
              }
            });
          }
        });
      },
      /** 提交按钮--结束 */
    },
  }
</script>
