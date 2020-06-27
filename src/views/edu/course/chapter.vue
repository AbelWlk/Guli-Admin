<template>
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
                <el-button type="text" @click="openVideoDialog(chapter.id)">添加小节</el-button>
                <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
            </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                        <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                        <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                    </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import chapterApi from "../../../api/edu/chapter";
  import videoApi from "../../../api/edu/video";

  export default {
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseId: '',
        chapterVideoList: [],
        dialogChapterFormVisible: false,//章节弹框
        dialogVideoFormVisible: false,//小节弹框
        chapter: {
          title: '',
          sort: 0
        },
        video: {// 课时对象
          title: '',
          sort: 0,
          isFree: 0,
          videoSourceId: ''
        },
      }
    },

    created() {
      this.getChapterVideo();
    },

    methods: {
      //=================================小节操作=========================
      openVideoDialog(chapterId) {
        this.video = {}
        this.dialogVideoFormVisible = true
        //设置章节id
        this.video.chapterId = chapterId
      },

      openEditVideo(videoId) {
        //修改小节弹框数据回显
        this.dialogVideoFormVisible = true;
        videoApi.getVideoInfoById(videoId)
          .then(response => {
            this.video = response.data.videoInfo
          })
      },

      saveOrUpdateVideo() {
        if (!this.video.id) {
          this.addVideo()
        } else {
          this.updateVideo()
        }

      },
      addVideo() {
        this.video.courseId = this.courseId
        videoApi.saveVideo(this.video)
          .then(response => {
            //关闭弹框
            this.dialogVideoFormVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '添加小节成功！'
            })
          })
        //刷新页面
        this.getChapterVideo()
      },
      updateVideo() {
        videoApi.updateVideoInfo(this.video)
          .then(response => {
            //关闭弹框
            this.dialogVideoFormVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '修改小节成功！'
            })
            //刷新页面
            this.getChapterVideo()
          })
      },

      removeVideo(videoId) {
        this.$confirm('此操作将永久删除该小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            videoApi.removeVideoById(videoId)
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //刷新页面
                this.getChapterVideo()
              })
              .catch(error => {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
                //刷新页面
                this.getChapterVideo()
              })
          })
      },

      //=================================章节操作=========================
      saveOrUpdate() {
        if (!this.chapter.id) {
          this.addChapter()
        } else {
          this.updateChapter()
        }
      },
      //修改
      updateChapter() {
        chapterApi.updateChapter(this.chapter)
          .then(response => {
            //关闭弹框
            this.dialogChapterFormVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '修改章节成功！'
            })

            //刷新页面
            this.getChapterVideo()

          })
      },
      //添加
      addChapter() {
        this.chapter.courseId = this.courseId
        chapterApi.addChapter(this.chapter)
          .then(response => {
            //关闭弹框
            this.dialogChapterFormVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '添加章节成功！'
            })

            //刷新页面
            this.getChapterVideo()

          })
      },

      removeChapter(chapterId) {
        this.$confirm('此操作将永久删除该章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            chapterApi.deleteChapter(chapterId)
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //刷新页面
                this.getChapterVideo()
              })
              .catch(error => {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
                //刷新页面
                this.getChapterVideo()
              })
          })
      },

      openChapterDialog() {
        this.chapter = {}
        this.dialogChapterFormVisible = true
      },

      openEditChapter(id) {
        //修改章节弹框数据回显
        this.dialogChapterFormVisible = true;
        chapterApi.getChapter(id)
          .then(response => {
            this.chapter = response.data.chapter
          })
      },

      //根据课程id获得章节和小节列表
      getChapterVideo() {
        //获取路由id值
        if (this.$route.params && this.$route.params.id) {
          this.courseId = this.$route.params.id
        }
        chapterApi.getAllChapterVideo(this.courseId)
          .then(response => {
            this.chapterVideoList = response.data.items
          })
      },

      previous() {
        this.$router.push({path: '/course/info/' + this.courseId})
      },

      next() {
        this.$router.push({path: '/course/publish/' + this.courseId})
      }
    }
  }
</script>

<style scoped>

</style>
