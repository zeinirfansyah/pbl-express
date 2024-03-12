import express from "express";
import roleController from "../controller/roleController";
import userController from "../controller/userController";
import userValidation from "../middleware/validation/userValidation";

const router = express.Router();

// role routes
router.get("/role", roleController.getAllRole);
router.get("/role/:id", roleController.getRole);
router.post("/role", roleController.createRole);
router.patch("/role/:id", roleController.updateRole);
router.delete("/role/:id", roleController.deleteRole);

// user routes
router.post("/user/register", userValidation.registrationValidation, userController.Register);
router.get("/user", userController.getAllUser);
router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.deleteUser);

export default router;