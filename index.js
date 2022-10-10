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
// 写接口之前，加入下面两行代码，目的是为了接收客户端提交的数据
app.use(express.json()) // 接收JSON格式的数据
app.use(express.urlencoded({ extended: true })) // 接收查询字符串格式的数据

app.post('/api/addbook',(req,res)=>{
    req.body.id = Date.now()
    readFile(books,'utf-8',(err,data)=>{
        if(err) throw err;
        let arr = JSON.parse(data)
        arr.push(req.body)
            if(err){
                res.send({status:1,message:'添加失败'})
            }else{
                res.send({status:0,message:'添加成功'})
            }
    })
    res.send({status:0,message:'添加成功'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})