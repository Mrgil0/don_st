const express = require("express");
let fs = require('fs');
const {Op} = require("sequelize");
const jwt = require("jsonwebtoken");
const {Server} = require("http"); // 1. 모듈 불러오기
// const authMiddleware = require("./middlewares/auth-middleware");
const user = require("./users.routes")
const laundry = require("./laundries.routes")
const page = require("./pages.routes")
const path = require("path");
myPath = path.join("static", "view"); //static/view 

const app = express();

const http = Server(app); // 2. express app을 http 서버로 감싸기

app.use(express.json());
app.use(express.static("static"));
app.set('view engine', 'ejs');
app.set('views', './static/view');

app.get('/', (req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // fs.createReadStream(myPath+"/home.html").pipe(res);
    res.render('home')
});

app.use("/users", [user]);

app.use("/laundry", [laundry]);

app.use("/page", [page]);

module.exports = http;