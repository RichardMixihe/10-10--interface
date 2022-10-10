const express = require('express')
const app = express()
const port = 3000
const { readFile, writeFile } = require('fs')
const { join } = require('path')
// 拼接一下books.json的绝对路径
const books = join(__dirname, 'books.json')

app.get('/api/getbooks', (req, res) => {
  // 把books.json里面的图书，读取出来，响应给客户端
  readFile(books, 'utf-8', (err, data) => {
    if (err) {
      res.send({ status: 1, message: '获取失败' })
    } else {
      res.send({ status: 0, message: '获取成功', data: JSON.parse(data) }) // 做出响应，参数就是响应结果
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})