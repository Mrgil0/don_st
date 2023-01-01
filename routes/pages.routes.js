const express = require('express');
const router = express.Router();
let fs = require('fs');
const path = require("path");
myPath = path.join("static", "view");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/login', (req, res) => {
    res.render('login', {user: null})
});

router.get('/logout', (req, res) => {
    res.cookie('accessToken', null);
    res.cookie('refreshToken', null);
    res.render('home', {user: null})
});

router.get('/register', (req, res) => {
    res.render('register', {user: null})
});

module.exports = router;