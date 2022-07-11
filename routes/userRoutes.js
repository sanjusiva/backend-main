var express=require('express')
var {getAllUser,getUserAccess,buyCourse,getPaidCourse,postUser}=require('../controllers/userController');
const userRouter=express.Router();

userRouter.get("/",getAllUser);
userRouter.get("/:username/:password",getUserAccess);
userRouter.put("/:course/:user",buyCourse);
userRouter.get("/:course/:name/list",getPaidCourse);
userRouter.post("/",postUser);

module.exports=userRouter;

