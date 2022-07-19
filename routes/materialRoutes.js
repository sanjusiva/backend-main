var express=require('express')
const materialController=require('../controllers/materialController');
const materialRouter=express.Router();
const { authentication }=require('../middleware/authGuard')

materialRouter.get("/",authentication,materialController.getAllMaterial);
materialRouter.get("/:id",authentication,materialController.getIdMaterial);
materialRouter.get("/:id/courseId",authentication,materialController.getCourseId);
materialRouter.get("/:Domain/:course",authentication,materialController.getMaterial);
materialRouter.get("/:course/cost/courseCost",authentication,materialController.getCourseCost);
materialRouter.get("/:courseId/courseId/check/checkCourseId",materialController.checkCourseID);
materialRouter.post("/",authentication,materialController.postMaterial);
materialRouter.put("/:id",authentication,materialController.putMaterial);
materialRouter.delete("/:id",authentication,materialController.deleteMaterial);

module.exports=materialRouter;