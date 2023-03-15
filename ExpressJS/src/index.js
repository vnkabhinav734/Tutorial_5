const express=require('express')
const app=express()

const route=require('./route')
app.use(express.json())
app.use('', route)
app.use(express.static('user_details.json'))
app.listen(4000);

