const express = require('express')
const app = express()

app.get('/', (req,res) => {
  res.send('Hello World')
})

app.get('/health',(req,res) => {
  res.send('I')
})

app.listen(3000,() => {
  console.log("Server up and running")
})