const express = require('express');
const router = express.Router();
let fs = require('fs');
const path = require("path");
myPath = path.join("static", "view");

router.get('/login', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream(myPath+"/login.html").pipe(res);
});

module.exports = router;