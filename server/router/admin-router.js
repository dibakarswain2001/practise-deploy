const {Router} = require("express");
const adminController = require("../controllers/admin-controller");
const router = Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


// ! get All user router
router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);

// ! get All contact router
router.route("/contacts").get(authMiddleware,adminController.getAllContacts);

// ! delete user router
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUserById);

// ! get user by id  user router
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminController.getUserById);

//  ! edit user by id route
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById);

// ! delete contact by id
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;