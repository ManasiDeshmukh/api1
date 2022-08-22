
const express = require('express')
const route = express.Router()
const jwt = require("jsonwebtoken")
const secret=require("./secret")
let items = require('./items')

function validateToken(obj,secret)
{
    return jwt.verify(obj,secret)
}

function getToken(obj)
{
    return jwt.sign(obj,secret)
}


route.post("/register",(req,res)=>{
    var authinfo={
        "token":getToken(req.body),
        "secret":secret
    }
    res.send(authinfo)
   
})


route.get('/view/:token/:secret', (req, res) => {
    var token=req.params.token

    var secret=req.params.secret

    var auth=validateToken(token,secret)
    console.log(token)

    console.log(secret)

    if(auth)
    res.send(items)
    else
    res.send("invalid details")


})




// route.post('/view2/:token/:secret', (req, res) => {
//     var token=req.params.token

//     var secret=req.params.secret

//     var auth=validateToken(token,secret)
//     console.log(token)

//     console.log(secret)

//     if(auth)
//     res.send(items)
//     else
//     res.send("invalid details")


// })





route.post('/add', (req, res) => {
    console.log('item array post')
    items = [...items, req.body]
    res.send(items)
})
route.delete('/delete', (req, res) => {
    console.log('item array delete')
    res.send(items.filter(i => i.name !== req.body.name))

})


route.patch("/update",(req,res)=>{
    var item=req.body
    var narray=items.filter((e)=>{
        e.name!=item.name
    })
    narray.push(item)
    items=narray
    res.send("updated")
})


module.exports = route

