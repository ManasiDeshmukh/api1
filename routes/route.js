const controller=require("../itemmicroservices/serrvicecontroller")

module.exports=function(app)
{
   app.route("/getitems").get(controller.getitems)
    app.route("/postitems").post(controller.postitems)
}