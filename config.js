let baseUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://0.0.0.0'
} else {
  baseUrl = 'http://localhost:3333'
}
export { baseUrl }
