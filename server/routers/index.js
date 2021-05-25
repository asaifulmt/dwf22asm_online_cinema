const express = require('express')
const { register, login } = require('../controllers/auth')
const { getCategories } = require('../controllers/category')
const { createFilm } = require('../controllers/film')
const { auth, isAdmin } = require('../middlewares/admin')
const uploadImage = require('../middlewares/uploadImage')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/film', auth, isAdmin, uploadImage, createFilm)
router.get('/category', getCategories)

module.exports = router
