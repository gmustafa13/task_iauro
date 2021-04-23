const express = require("express");
const router = express.Router();
const userController = require('../controller/user');
const { auth, singleAdmin , isAdmin} = require('../middleware/auth');// middleware

router.post('/createUser', singleAdmin, userController.create)
router.post('/signIn', userController.signIn)
router.delete('/deleteUser/:id', isAdmin, userController.deleteUser);
router.patch("/updateUser/:id", isAdmin, userController.updateUser);


module.exports = router