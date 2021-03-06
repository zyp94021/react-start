import AppData from '../AppData'
export const request = (api, options = {}) =>
  fetch(api, {
    ...options,
  }).then(rsp => rsp.json())

export const get = (api, data = undefined) =>
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
