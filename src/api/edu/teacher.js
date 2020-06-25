import request from '@/utils/request'

const api_name = '/edu/teacher'
//"/edu/teacher/pageTeacherCondition/{current}/{limit}"
export default {

  //讲师列表 条件分页
  getPageList(current, limit, teacherQuery) {
    return request({
      url: `${api_name}/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery//服务器需要@RequestBody
    })
  },
  //删除讲师
  deleteTeacherById(teacherId) {
    return request({
      url: `${api_name}/${teacherId}`,
      method: 'delete'
    })
  },
  //添加讲师
  addTeacher(teacher) {
    return request({
      url: `${api_name}/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  //根据id查询
  getTeacherById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  //修改
  updateTeacher(teacher) {
    return request({
      url: `${api_name}/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
