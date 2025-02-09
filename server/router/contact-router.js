const {Router} = require("express");

const router = Router();
const contactForm = require("../controllers/contact-controller");

router.route("/contact").post(contactForm);


module.exports = router;