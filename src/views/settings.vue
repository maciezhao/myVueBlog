<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane name="getbackHome"
        ><span slot="label"><router-link :to="{path:'/'}"><i class="iconfont icon-angle-left"></i>返回首页</router-link></span></el-tab-pane
      >
      <el-tab-pane label="个人资料" name="profile"></el-tab-pane>
      <el-tab-pane label="账号设置" name="account"></el-tab-pane>
    </el-tabs>
    <template v-if="activeName == 'profile'">
      <el-form :model="profileForm" ref="profileForm" :rules="profileRules" label-width="80px" label-position="right">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :headers="myHeaders"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">仅支持上传jpg文件，图片大小不超过500KB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="profileForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userNickName">
          <el-input v-model="profileForm.userNickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="profileForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="userPhone">
          <el-input v-model="profileForm.userPhone"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button :loading="profileLoading" type="primary" @click="submitProfileForm">更 新</el-button>
        </div>
      </el-form>
    </template>
    <template v-else-if="activeName == 'account'">
      <el-button type="text" @click="accountDialogVisible = true">修改密码</el-button>
      <el-dialog title="修改密码" :visible.sync="accountDialogVisible" width="50%" center :close-on-click-modal="false">
        <el-form :model="accountForm" ref="accountForm" :rules="accountRules">
          <el-form-item label="原密码：" prop="oldPassWd">
            <el-input v-model="accountForm.oldPassWd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassWd">
            <el-input v-model="accountForm.newPassWd" show-password></el-input>
          </el-form-item>
          <el-form-item label="请再次输入新密码：" prop="sameNewPassWd">
            <el-input v-model="accountForm.sameNewPassWd" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="accountDialogVisible = false">取 消</el-button>
          <el-button :loading="accountLoading" type="primary" @click="submitAccountForm">提 交</el-button>
        </span>
      </el-dialog>
    </template>
  </el-card>
</template>

<script>
import md5 from 'js-md5';
export default {
  data() {
    const validatesameNewPassWd = (rule, value, callback) => {
      if (value !== this.accountForm.newPassWd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      myHeaders: {
        'Access-Control-Allow-Origin': '*',
        // "Expect":"100-continue",
      },
      userAvatar: '',
      activeName: 'profile',
      imageUrl: '',
      avatarDialogVisible: false,
      accountDialogVisible: false,
      accountLoading:false,
      profileLoading:false,
      profileForm: {
        userName: '',
        userNickName: '',
        userEmail: '',
        userPhone: '',
      },
      accountForm: {
        oldPassWd: '',
        newPassWd: '',
        sameNewPassWd: '',
      },
      profileRules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度为3-20个字符', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确'}
        ],
        userEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确'}
        ]
      },
      accountRules: {
        oldPassWd: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
        ],
        newPassWd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {pattern: /^(\w){5,15}$/, message: '只能输入字母、数字、下划线，长度为5-15个字符'}
        ],
        sameNewPassWd: [
          { required: true, validator:validatesameNewPassWd, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    submitProfileForm() {
      this.$refs.profileForm.validate(valid => {
        if(valid) {
          this.profileLoading = true
          let type = "profile"
          const data = new FormData()
          for (var key in this.profileForm) {
            data.append(key, this.profileForm[key])
          }
          data.append('type', type)
          data.append('userAvatar', this.userAvatar)
          // data.append(this.userAvatar.get("avatar"))
          data.append('oldUserName', this.$store.state.user.name)
          this.$store.dispatch('user/modifyUserInfo', data).then(response => {
            this.profileLoading = false
            this.$store.state.user.name = response.userName
            this.$message.success({ message: '更新成功', showClose: true })
            location.reload()
          }).catch (error => {
            this.profileLoading = false
            console.log(error)
          })
        }
      })
    },
    submitAccountForm() {
      this.$refs.accountForm.validate(valid => {
        if(valid) {
          this.accountLoading = true
          let type = "account"
          let data = new FormData()
          data.append('oldPassWd', md5(this.accountForm.oldPassWd))
          data.append('newPassWd', md5(this.accountForm.newPassWd))
          data.append('userName', this.$store.state.user.name)
          data.append('type', type)
          this.$store.dispatch('user/modifyUserInfo', data).then(response => {
            this.accountLoading = false
            this.accountDialogVisible = false
            this.$message.success({ message: '更新成功', showClose: true })
            location.reload()
          }).catch (error => {
            this.accountLoading = false
            console.log(error)
          })
        }
      })
    },
    handleAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("imgurl:", this.imageUrl)
      this.userAvatar = file.raw
      // this.userAvatar = new FormData().append("avatar", file.raw);

    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500KB!');
      }
      return isJPG && isLt2M;
    },
    getUserInfo() {
      this.$store.dispatch('user/getUserInfo').then(response => {
        this.imageUrl = response.userInfo.userAvatarPath
        this.profileForm.userName = response.userInfo.userName
        this.profileForm.userNickName = response.userInfo.userNickName
        this.profileForm.userEmail = response.userInfo.userEmail
        this.profileForm.userPhone = response.userInfo.userPhone
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  // text-align: center;
  min-height: 600px;
  height: 100%;
}
</style>

<style>
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>