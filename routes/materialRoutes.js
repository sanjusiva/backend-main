var express=require('express')
var {getAllMaterial,getIdMaterial,getMaterial,getCourseCost,postMaterial,putMaterial,deleteMaterial}=require('../controllers/materialController');
const materialRouter=express.Router();
const { authentication }=require('../middleware/authGuard')

materialRouter.get("/",authentication,getAllMaterial);
materialRouter.get("/:id",authentication,getIdMaterial);
materialRouter.get("/:Domain/:course",authentication,getMaterial);
materialRouter.get("/:course/cost/courseCost",authentication,getCourseCost);
// materialRouter.get("/:Domain",getCourseId);
materialRouter.post("/",authentication,postMaterial);
materialRouter.put("/:id",authentication,putMaterial);
materialRouter.delete("/:id",authentication,deleteMaterial);

module.exports=materialRouter;