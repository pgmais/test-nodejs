const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const controller = require('../controllers/Client');
const router = express.Router();

router.route('/')
	.get(controller.find)
	.post(controller.insert);

router.route('/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.remove);

router.get('/cep/:cep', controller.findDataCEP);

router.post('/upload', upload.single('client'), controller.removeUpload);

module.exports = router;