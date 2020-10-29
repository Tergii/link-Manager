const express = require('express');

const ctr = require('../controllers/controllers');


const router = express.Router();

router.post('/register', ctr.registerUser);
router.post('/save', ctr.saveLinks);
router.put('/update', ctr.updateLinks);
router.post('/login', ctr.logInUser);
router.put('/updateData', ctr.updateUserData);
router.post('/message', ctr.sendMessage);

module.exports = router