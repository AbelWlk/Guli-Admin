import request from '@/utils/request'

const api_name = '/statistics/daily'

export default {

  createStaDate(day) {
    return request({
      url: `${api_name}/registerCount/${day}`,
      method: 'post'
    })
  },
  getDataSta(searchObj){
    return request({
      url: `${api_name}/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }

}
