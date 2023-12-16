import { Hedgehog } from '@audius/hedgehog'
import axios, { AxiosRequestConfig } from 'axios'

const makeRequestToService = async (axiosRequestObj: any) => {
  axiosRequestObj.baseURL = 'http://localhost:9000'

  try {
    const resp = await axios(axiosRequestObj)
    if (resp.status === 200) {
      return resp.data
    } else {
      throw new Error(
        `Server returned error: ${resp.status.toString()} ${
          resp.data['error']
        }`,
      )
    }
  } catch (e) {
    console.error(e)
    throw new Error(`Server returned error: ${e}`)
  }
}

const setAuthFn = async (obj: any) => {
  await makeRequestToService({
    url: '/authentication',
    method: 'post',
    data: obj,
  })
}

const setUserFn = async (obj: any) => {
  await makeRequestToService({
    url: '/user',
    method: 'post',
    data: obj,
  })
}

const getFn = async (obj: any) => {
  return makeRequestToService({
    url: '/authentication',
    method: 'get',
    params: obj,
  })
}

export const hedgehog = new Hedgehog(getFn, setAuthFn, setUserFn)
