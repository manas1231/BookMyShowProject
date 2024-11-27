const router=require("express").Router();
const {loginUser,registerUser, currentUser,forgetPassword,resetPassword}=require("../controllers/userController");
const { validateJWTToken } = require("../middleware/authorizationMiddleware");


router.post("/login",loginUser)

router.post("/register",registerUser)

router.get("/getCurrentUser",validateJWTToken,currentUser)

router.post("/forgetPassword", forgetPassword);

router.post("/resetPassword", resetPassword);
module.exports=router;