var express=require('express')
const userRouter=express.Router();
const userController=require('../controllers/userController');
const { authentication }=require('../middleware/authGuard')

userRouter.get("/",userController.getAllUser);
userRouter.post("/login",userController.postUserAccess);
userRouter.put("/:course/:user",userController.buyCourse);
userRouter.get("/:course/:name/list",userController.getPaidCourse);
userRouter.post("/",userController.postUser);

module.exports=userRouter;

