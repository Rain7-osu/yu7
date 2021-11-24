const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = process.env.PORT || 3000

const app = express()

const proxy = createProxyMiddleware('/api', {
  target: 'todo: proxy url',
  changeOrigin: true,
})

app.use('/api', proxy)

app.listen(PORT, () => {
  console.log('Express server started...')
})