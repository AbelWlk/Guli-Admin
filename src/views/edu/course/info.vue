<template>
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类" @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <el-select
          v-model="courseInfo.subjectId"
          placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/oss/file/upload'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import courseApi from "../../../api/edu/course";
  import subjectApi from "../../../api/edu/subject";
  import Tinymce from '@/components/Tinymce';

  export default {
    components: {Tinymce},
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseInfo: {
          title: '',
          subjectId: '',//二级分类
          subjectParentId: '',//一级分类
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '/static/default.jpg',
          price: 0
        },
        teacherList: [],
        subjectOneList: [],//一级分类列表
        subjectTwoList: [],//二级分类列表
        BASE_API: process.env.BASE_API
      }
    },

    created() {
      //初始化讲师
      this.getAllTeacher()
      //初始化一级分类
      this.getOneSubject()
    },

    methods: {

      saveOrUpdate() {
        courseApi.addCourseInfo(this.courseInfo)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加课程信息成功！'
            })
            //跳转到第二步
            this.$router.push({path: '/course/chapter/' + response.data.courseId})
          })
      },
      //查询所有讲师
      getAllTeacher() {
        courseApi.getListTeacher()
          .then(response => {
            this.teacherList = response.data.items
          })
      },
      //查询所有一级分类
      getOneSubject() {
        subjectApi.getSubjectList()
          .then(response => {
            this.subjectOneList = response.data.items
          })
      },
      subjectLevelOneChanged(value) {
        console.log(value)
        for (let i = 0; i < this.subjectOneList.length; i++) {
          if (this.subjectOneList[i].id === value) {
            this.subjectTwoList = this.subjectOneList[i].children
            this.courseInfo.subjectId = ''
          }
        }
      },
      //上传分封面成功调用的
      handleAvatarSuccess(res, file) {
        this.courseInfo.cover = res.data.url
      },
      //上传封面之前调用
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
</style>
