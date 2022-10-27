const express = require('express')
const router = express.Router()
const controller = require('../controllers/test')


router.get('/api/test/get/:uuid', controller.parseGetParams)

router.post('/api/test/post', controller.parsePostParams)

router.put('/api/test/put', controller.parsePutFormData)


module.exports = router