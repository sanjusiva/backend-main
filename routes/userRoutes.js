var express=require('express')
var {getAllUser,getUserAccess}=require('../controllers/userController');
const userRouter=express.Router();

userRouter.get("/",getAllUser);
userRouter.get("/:username/:password",getUserAccess);

module.exports=userRouter;

