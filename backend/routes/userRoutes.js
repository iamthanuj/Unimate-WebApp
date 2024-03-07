const express = require('express')
const router = express.Router()
const multer = require('multer')
const {registerUser, loginUser, getUser, getUserFriends, addFriend} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const storage = multer.memoryStorage()
const upload  = multer({storage: storage})


router.post('/register',upload.single('avatar'), registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getUser)
router.get('/friends',protect, getUserFriends)
router.patch('/addfriend',protect,addFriend )

module.exports = router
