const {Router} = require("express");
const authControllers = require("../controllers/auth-controller");
const router = Router();
const {signupSchema, loginSchema} = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);

router.route("/register").post(validate(signupSchema),authControllers.register)

router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/user").get(authMiddleware,authControllers.user)

module.exports = router;