const express = require('express')
const router = express.Router()
const controller = require('../controllers/video')


router.get('/api/video/check', controller.checkTempFile)

router.put('/api/video/upload', controller.uploadSliceFile)

router.get('/api/video/merge', controller.mergeTempFile)

router.get('/api/video/remove', controller.removeTempFile)

module.exports = router