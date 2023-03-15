const express=require('express');
const app = require('.');
const router=express.Router();
const crypto = require('crypto');
const fs=require('fs')
const bodyparser=require('body-parser')

router.use(bodyparser.json())

var user_details=[]
router.get("/users",(req,res)=>{
    fs.readFile('./user_details.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error reading file' });
          return;
    }
    user_details=JSON.parse(data)
    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: user_details
    })
})
})

router.post("/add",(req,res)=>{
    var input=req.body
    if(input?.email && input?.firstname){
        fs.readFile('./user_details.json', 'utf8', (err, existingdata) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Error reading file' });
              return;
        }
        user_details=JSON.parse(existingdata)
        var id=crypto.randomUUID()
        input.id=id
        user_details.push(input)
        const updatedData = JSON.stringify(user_details);
        fs.writeFileSync('user_details.json', updatedData);
        res.status(200).json({
            message:"User added",
            success:true
        })
    })
    }
    else{
        res.status(500).json({
            message:"Error"
        })
    }
})

router.put("/update/:id",(req,res)=>{
    var input=req.body
    if(input?.email && !input?.firstname){
        fs.readFile('./user_details.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Error reading file' });
              return;
        }
        user_details=JSON.parse(data)
        const userId=req.params.id
        const userIndex=user_details.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            return res.status(404).send('User not found');
          }
        const updatedUser={
            "email":input.email,
            "firstname":user_details[userIndex].firstname,
            "id":userId
        }
        user_details[userIndex]=updatedUser
        const updatedData = JSON.stringify(user_details);
        fs.writeFileSync('user_details.json', updatedData);
        res.status(200).json({
            message:"User updated",
            success:true
        })
    })
    }
    else if(!input?.email && input?.firstname){
        fs.readFile('./user_details.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Error reading file' });
              return;
        }
        user_details=JSON.parse(data)
        const userId=req.params.id
        const userIndex=user_details.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            return res.status(404).send('User not found');
          }
        const updatedUser={
            "email":user_details[userIndex].email,
            "firstname":input.firstname,
            "id":userId
        }
        user_details[userIndex]=updatedUser
        const updatedData = JSON.stringify(user_details);
        fs.writeFileSync('user_details.json', updatedData);
        res.status(200).json({
            message:"User updated",
            success:true
        })
    })
    }
    
    else if(input?.email && input?.firstname){
        fs.readFile('./user_details.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Error reading file' });
              return;
        }
        user_details=JSON.parse(data)
        const userId=req.params.id
        const userIndex=user_details.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            return res.status(404).send('User not found');
          }
        const updatedUser={
            "email":input.email,
            "firstname":input.firstname,
            "id":userId
        }
        user_details[userIndex]=updatedUser
        const updatedData = JSON.stringify(user_details);
        fs.writeFileSync('user_details.json', updatedData);
        res.status(200).json({
            message:"User updated",
            success:true
        })
        console.log("user updated")
    })
        }
    else{
        res.status(500).json({
            message:"User Not Found"
        })
    }

})

router.get("/user/:id",(req,res)=>{
    fs.readFile('./user_details.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error reading file' });
          return;
    }
    user_details=JSON.parse(data)
    const userId=req.params.id
    const userIndex=user_details.findIndex(user => user.id === userId)
    if (userIndex === -1) {
        return res.status(404).send('User not found');
      }
    
    res.status(200).json({
        success: true,
        user: user_details[userIndex] 
    })
})
})

module.exports=router