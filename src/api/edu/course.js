import request from '@/utils/request'

const api_name = '/edu/course'

export default {

  addCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //查询所有讲师
  getListTeacher() {
    return request({
      url: `/edu/teacher/findAll`,
      method: 'get'
    })
  },
  //根据课程id查询课程信息
  getCourseInfo(courseId) {
    return request({
      url: `${api_name}/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  //根据课程id修改课程信息
  updateCourseInfo(courseInfoVo) {
    return request({
      url: `${api_name}/updateCourseInfo`,
      method: 'post',
      data: courseInfoVo
    })
  },
  getPublishCourseInfo(courseId){
    return request({
      url: `${api_name}/getPublishCourseInfo/${courseId}`,
      method: 'get',
    })
  },
  //课程最终发布
  publishCourse(courseId){
    return request({
      url: `${api_name}/publish/${courseId}`,
      method: 'post',
    })
  }

}
