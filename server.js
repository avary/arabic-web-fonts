express = require("express")
u = require("underscore")
var app = express.createServer();
app.use(express.static(__dirname + '/data'));
app.set('views', __dirname + '/views');
app.listen(9020);

var fonts = {
    "KacstBook": "KacstBook.ttf",
    "KacstOne": "KacstOne.ttf",
    "KacstPen": "KacstPen.ttf",
    }

fontnames = u.keys(fonts);
fontnames.sort();

var fonturl = function(req, name) {
    var root = "http://" + req.header("host") + "/";
    return root + fonts[name];
}

app.get('/', function(req, res){
    res.render('index.jade', {layout: false, fonts: fonts, fontnames: fontnames});
});

app.get('/css', function(req, res){
    var names = u.keys(req.query);
    u.each(names, function(name) {
        if(name in fonts) {
            res.write("/*   " + name + "   */ \n");
            res.write("@font-face{ \n  font-family: " + name + "; \n  src: url('" + fonturl(req, name) + "'); \n}\n\n");
        }
        else {
            res.write("/* The font '" + name + "' is not in this repository! */ \n\n");
        }
    });
    res.end();
});

