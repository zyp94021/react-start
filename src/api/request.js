import { server } from '../config'
import AppData from '../AppData'
export const request = (api, options = {}) =>
  Promise.all(
    AppData.server.map(item =>
      fetch(server.find(item2 => item2.id === item).serverUrl + api, {
        ...options,
      }).then(rsp => rsp.json()),
    ),
  )

export const get = (api, data) =>
  request(
    data
      ? `${api}?${Object.entries(data)
          .map(e => e.join('='))
          .join('&')}`
      : api,
  )
export const post = (api, data) =>
  request(api, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
