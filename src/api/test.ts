import axios from 'axios'

export const httpTestGetRequest = (uuid: string) => {
  return axios.get(`/api/test/get/${uuid}`, { params: { name: 'Phoenix' } })
}

export const httpTestPostRequest = () => {
  return axios.post(`/api/test/post`, { name: 'Phoenix' })
}

export const httpTestPutFormRequest = (formData: FormData) => {
  return axios.put(`/api/test/put`, formData)
}
