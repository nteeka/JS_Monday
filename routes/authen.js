const express = require('express');
const router = express.Router();
const modelUser = require('../models/user');
const validate = require('../validates/user');
const { checkLogin, checkRole } = require('../middlewares/protect.js');
const responseData = require('../helper/responseData');

// Registration endpoint
router.post('/register', validate.validator(), async function(req, res) {
    try {
        const newUser = await modelUser.createUser(req.body);
        responseData.responseReturn(res, 200, true, newUser);
    } catch (error) {
        responseData.responseReturn(res, 400, false, error.message);
    }
});

// Login endpoint
router.post('/login', async function(req, res) {
    try {
        const token = await modelUser.login(req.body.userName, req.body.password);
        res.cookie('tokenJWT', token);
        responseData.responseReturn(res, 200, true, token);
    } catch (error) {
        responseData.responseReturn(res, 400, false, error.message);
    }
});

// User information retrieval endpoint
router.get('/me', checkLogin, checkRole('user'), async function(req, res) {
    try {
        const user = await modelUser.getOne(req.userID);
        res.send({ "done": user });
    } catch (error) {
        responseData.responseReturn(res, 400, false, error.message);
    }
});

module.exports = router;
