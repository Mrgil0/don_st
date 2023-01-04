const express = require("express");
let fs = require('fs');
const {Op} = require("sequelize");
const {Server} = require("http"); // 1. 모듈 불러오기
const authMiddleware = require("../middlewares/auth.middleware");
const user = require("./users.routes")
const laundry = require("./laundries.routes")
const LandriesController = require('../controllers/laundries.controller');
const laundriesController = new LandriesController();
const cookies = require("cookie-parser");

const app = express();

app.use(cookies()); 
app.use(express.json());
app.use(express.urlencoded( {extended : true } ))
app.use(express.static("static"));
app.set('view engine', 'ejs');
app.set('views', './static/view');
const http = Server(app); // 2. express app을 http 서버로 감싸기

app.get('/', authMiddleware, laundriesController.findLaundryAndStatus, async (req, res) => {
    const users = res.locals.user;
    const myLaundry = res.locals.laundry;
    let laundriesList;
    if(users && users.category === '사장'){
        laundriesList = await laundriesController.findLaundryList()
    }
    res.render('home', {user: users, myLaundry: myLaundry, laundriesList});
});

app.get('/login', (req, res) => {
    res.render('login', {user: null})
});

app.get('/logout', authMiddleware, laundriesController.findLaundryAndStatus, (req, res) => {
    res.cookie('accessToken', null);
    res.cookie('refreshToken', null);
    const myLaundry = res.locals.laundry;
    res.render('home', {user: false, myLaundry: myLaundry})
});

app.get('/register', (req, res) => {
    res.render('register', {user: false})
});

app.use("/users", [user]);

app.use("/laundry", [laundry]);

module.exports = http;