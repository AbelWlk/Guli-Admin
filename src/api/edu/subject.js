import request from '@/utils/request'

const api_name = '/edu/subject'

export default {

  getSubjectList() {
    return request({
      url: `${api_name}/getAllSubject`,
      method: 'get'
    })
  }
}
