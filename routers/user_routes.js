// Comment
// Importing dependencies
import express from "express";
import userController from "../controller/user_controller";
import checkAuth from "../middleware/token";
import userValidation from "../middleware/user_validate";

// Comment
// Declaring variables
const router = express.Router();

// Comment
// All user routers
router
  .get("/all", checkAuth, userController.getUsers)
  .get("/one/:id", checkAuth, userController.getOneUser)
  .post("/login", userValidation.userValidate, userController.loginUser)
  .post("/signup", userValidation.userValidate, userController.signup)
  .put("/:id", checkAuth, userController.updateUser)
  .delete("/:id", checkAuth, userController.deleteUser);
// Comment
// Exporting module
export default router;
