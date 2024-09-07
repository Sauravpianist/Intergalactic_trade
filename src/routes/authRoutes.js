const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body } = require('express-validator');
const {createUser,loginUser,getUser} = require('../controllers/authController');

router.post('/createuser',[
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter valid email adress').isEmail(),
    body('password', 'Password must be atleast min 5 characters').isLength({ min: 5 })
  ],createUser)

router.post('/login', [
    body('email', 'Enter valid email address').isEmail(),
    body('password', 'Password can not be blank').exists()
  ],loginUser);

router.get('/getuser', fetchuser,getUser)

module.exports = router;