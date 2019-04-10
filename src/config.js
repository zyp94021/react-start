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
    { id: 1, name: '嘉鹏', serverUrl: 'http://10.1.100.223:6060' },
  ]
}
export { server }
