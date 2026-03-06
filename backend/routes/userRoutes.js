const express = require('express');
const { protect } = require('../middleware/authMiddelware');
const {registerUser, authUser, allUsers}=require('../controllers/userControllers')


const router=express.Router();

router.post('/',registerUser);
router.post('/login',authUser);
router.get("/",protect, allUsers);


module.exports=router;