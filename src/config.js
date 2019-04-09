let server
if (process.env.NODE_ENV === 'production') {
  server = [
    { id: 1, name: '1服', serverUrl: 'http://localhost:3333' },
    { id: 2, name: '2服', serverUrl: 'http://localhost:3333' },
    { id: 3, name: '3服', serverUrl: 'http://localhost:3333' },
    { id: 4, name: '4服', serverUrl: 'http://localhost:3333' },
  ]
} else {
  server = [
    { id: 1, name: '测试服', serverUrl: 'http://localhost:3333' },
    { id: 2, name: '测试服2', serverUrl: 'http://localhost:3333' },
  ]
}
export { server }
