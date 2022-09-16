const express = require('express');
const router = express.Router();
const photoController = require("../controllers/photoController")

router.get('/', photoController.photo);

module.exports = router;