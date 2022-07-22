var express=require('express')
const userRouter=express.Router();
const userController=require('../controllers/userController');

userRouter.get("/",userController.getAllUser);
userRouter.get("/:id",userController.getUserId);
userRouter.post('/adminLogin',userController.postLoginDetail)
userRouter.post("/login",userController.postUserAccess);
userRouter.put("/:id",userController.putUser);
userRouter.put("/:course/:user",userController.buyCourse);
userRouter.get("/:course/:name/list",userController.getPaidCourse);
userRouter.post("/",userController.postUser);

module.exports=userRouter;

