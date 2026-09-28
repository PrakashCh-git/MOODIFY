const {Router} = require("express");
const { registerController,loginController,getMe,logoutUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth.middleware")

const router = Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/get-me",authMiddleware.authUser,getMe);
router.get("/logout",logoutUser);

module.exports = router;