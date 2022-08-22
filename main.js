var express=require("express")

var route=require("./route.js")
var app=express();
app.use(express.json())//to get json data from postman
app.use("/",route)



var server =app.listen(5055,function()
{
    var host=server.address().address;
    var port= server.address().port
    console.log("server running on "+host+" "+port)
})