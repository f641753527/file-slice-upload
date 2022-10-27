import axios from 'axios'

export const httpCheckFileRequest = (fileName: string) => {
  return axios.get(`/api/video/check`, {  params: {fileName} }).then(res => {
    return res.data.data
  })
}

export const httpUploadFileRequest = (formData: FormData, controller: AbortController) => {
  return axios.put(`/api/video/upload`, formData, { signal: controller.signal }).then(res => {
    return res.data.data
  })
}

export const httpMergeFileRequest = (fileName: string) => {
  return axios.get(`/api/video/merge`, { params: { fileName } }).then(res => {
    return res.data.data
  })
}

export const httpRemoveFileRequest = (fileName: string) => {
  return axios.get(`/api/video/remove`, { params: { fileName } }).then(res => {
    return res.data.data
  })
}