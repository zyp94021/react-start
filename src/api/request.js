export const request = (api, options = {}) =>
  fetch(api, { ...options }).then(rsp => rsp.json())
export const get = (api, data) =>
  request(
    `${api}?${Object.entries(data)
      .map(e => e.join('='))
      .join('&')}`,
  )
export const post = (api, data) =>
  request(api, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
