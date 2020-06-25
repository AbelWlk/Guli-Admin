<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" :max="3"></el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import teacherApi from "../../../api/edu/teacher";

  export default {
    data() {
      return {
        teacher: {
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: ''
        },
        saveBtnDisabled: false // 保存按钮是否禁用,
      }
    },
    created() {
      this.init()
    },
    watch: {//监听
      $route(to, from) {//路有变化方式，路由发生变化，清空
        this.init()
      }
    },
    methods: {
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getById(id)
        }else {
          this.teacher={}
        }
      },
      saveOrUpdate() {
        //判断修改 还是 添加
        if (!this.teacher.id) {
          this.saveData()
        } else {
          this.updateTeacherById(this.teacher)
        }
      },
      // 保存
      saveData() {
        teacherApi.addTeacher(this.teacher)
          .then(response => {//添加成功
            //提示信息
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            //回到列表页面 路由跳转
            this.$router.push({path: '/teacher/table'})
          })
      },
      getById(id) {
        teacherApi.getTeacherById(id)
          .then(response => {
            this.teacher = response.data.item
          })
      },
      updateTeacherById(teacher) {
        teacherApi.updateTeacher(teacher)
          .then(response => {
            //提示信息
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            //回到列表页面 路由跳转
            this.$router.push({path: '/teacher/table'})
          })
      }
    }
  }
</script>

<style scoped>

</style>
