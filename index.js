var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fetch = require('node-fetch');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    fetch('http://xkcd.com/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('/', {data:data})
    });
});

app.get('/random', function(req, res){
    let randomNumber = rand(1, 600);
    fetch('http://xkcd.com/'+randomNumber+'/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('/random', {data:data})
    });
});

function rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

app.listen(port, function(){
    console.log('Listening on ' + port)
});