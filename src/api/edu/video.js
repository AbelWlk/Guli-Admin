import request from '@/utils/request'

const api_name = '/edu/video'

export default {

  saveVideo(video) {
    return request({
      url: `${api_name}/addVideo`,
      method: 'post',
      data: video
    })
  },

  getVideoInfoById(videoId) {
    return request({
      url: `${api_name}/getVideo/${videoId}`,
      method: 'get'
    })
  },

  updateVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/updateVideo`,
      method: 'post',
      data: videoInfo
    })
  },

  removeVideoById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
