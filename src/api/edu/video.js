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
  //删除小节
  removeVideoById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  //删除阿里云视频
  deleteAliVideo(id) {
    return request({
      url: `/vod/video/removeAliVideo/${id}`,
      method: 'delete'
    })
  }
}
