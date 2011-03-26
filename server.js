express = require("express")
u = require("underscore")
var app = express.createServer();
// app.use(express.static(__dirname + '/data'));
app.set('views', __dirname + '/views');
app.listen(9020);

var fonts = {
    "KacstBook": "KacstBook.ttf",
    "KacstOne": "KacstOne.ttf",
    "KacstPen": "KacstPen.ttf",
    "Amiri": "amiri-regular.ttf",
    }

fontnames = u.keys(fonts);
fontnames.sort();

var font_exists = function(name) { return name in fonts; }

var fonturl = function(req, name) {
    return "http://" + req.header("host") + "/font/" + name;
}

app.get('/', function(req, res){
    res.render('index.jade', {layout: false, fonts: fonts, fontnames: fontnames});
});

app.get('/font/:name', function(req, res) {
    if(!font_exists(req.params.name)) { res.send("Font doesn't exists: " + req.params.name, 404); }
    else {
        res.header("Access-Control-Allow-Origin", "*");
        res.download(__dirname + "/fonts/" + fonts[req.params.name]);
    }
});

app.get('/css', function(req, res){
    res.contentType("text/css");
    var names = u.keys(req.query);
    u.each(names, function(name) {
        if(font_exists(name)) {
            res.write("/*   " + name + "   */ \n");
            res.write("@font-face { \n  font-family: '" + name + "'; \n  src: url('" + fonturl(req, name) + "'); \n}\n\n");
        }
        else {
            res.write("/* The font '" + name + "' is not in this repository! */ \n\n");
        }
    });
    res.end();
});

