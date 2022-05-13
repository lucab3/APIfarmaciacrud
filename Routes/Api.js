var express = require('express');
var router = express.Router();
let routescontroller = require('../controllers/routesController')


router.get('/',routescontroller.index);

router.get("/farmacia",routescontroller.negociocercano);

router.post("/farmacia",routescontroller.guardado);

module.exports = router;