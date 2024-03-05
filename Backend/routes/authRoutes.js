const { Router } = require ('express')
const authController = require ('../controllers/authController')
const router = Router();


router.post('/signup',authController.signup_post)
router.get('/login',()=>{})

module.exports = router