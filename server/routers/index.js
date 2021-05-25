const express = require('express')
const { register, login } = require('../controllers/auth')
const { getCategories } = require('../controllers/category')
const { createFilm, getFilmById } = require('../controllers/film')
const { getProfile } = require('../controllers/user')
const { buyFilm } = require('../controllers/userFilm')
const { auth, isAdmin } = require('../middlewares/admin')
const uploadImage = require('../middlewares/uploadImage')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/film', auth, isAdmin, uploadImage, createFilm)
router.get('/film/:id', auth, getFilmById)
router.post('/film/:id', auth, uploadImage, buyFilm)
router.get('/category', getCategories)
router.get('/profile', auth, getProfile)

module.exports = router
