export const request = (api, options) =>
  fetch(api, options).then(rsp => rsp.json())
export const get = api => fetch(api).then(rsp => rsp.json())
export const post = (api, data) =>
  fetch(api, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }).then(rsp => rsp.json())
