import request from '@/utils/request'

const api_name = '/edu/chapter'

export default {
  //根据课程id获得章节和小节列表
  getAllChapterVideo(courseId) {
    return request({
      url: `${api_name}/getChapterVideo/${courseId}`,
      method: 'get',
    })
  },
  addChapter(chapter) {
    return request({
      url: `${api_name}/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  getChapter(chapterId) {
    return request({
      url: `${api_name}/getChapterInfo/${chapterId}`,
      method: 'get',
    })
  },
  updateChapter(chapter) {
    return request({
      url: `${api_name}/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `${api_name}/${chapterId}`,
      method: 'delete',
    })
  },
}
