const router = require('express').Router();
const checkAuthentication = require('../lib/verify-auth').checkAuthentication;

router.get('/', checkAuthentication, (req, res, next) => {
    res.send('diary form');
})
module.exports = router;