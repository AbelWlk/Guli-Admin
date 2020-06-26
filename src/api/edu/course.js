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
  getListTeacher(){
    return request({
      url: `/edu/teacher/findAll`,
      method: 'get'
    })
  }
}
