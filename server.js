express = require("express")
var app = express.createServer();
app.use(express.static(__dirname + '/data'));
app.set('views', __dirname + '/views');
app.listen(9020);

var fonts = {
    "Kacst Book": "KacstBook.ttf",
    "Kacst One": "KacstOne.ttf",
    "Kacst Pen": "KacstPen.ttf",
    }

fontnames = [];
for(k in fonts) { fontnames.push(k); }
fontnames.sort();

app.get('/', function(req, res){
    res.render('index.jade', {layout: false, fonts: fonts, fontnames: fontnames});
});

