var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");
var fs = require('fs');
var serve = require('koa-static');
//code to send static file to front end
var readFileThunk = function(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}
// routes
var blogRoutes = require("./blogRoutes.js");
app.use(routes.post("/blogs/", blogRoutes.add));
app.use(routes.get("/blogs/:id", blogRoutes.get));
app.use(routes.put("/blogs/:id", blogRoutes.update));
app.use(routes.del("/blogs/:id", blogRoutes.remove));
app.use(routes.get("/blogs/", blogRoutes.getAll));
//comment routes

app.use(routes.post("/comments", blogRoutes.addComments));
app.use(routes.get("/comments/:id", blogRoutes.getComments));
app.use(routes.put("/comments/:id", blogRoutes.updateComments));
app.use(routes.del("/comments/:id", blogRoutes.removeComments));



app.use(routes.get('/', function *(){
  this.body = yield readFileThunk(__dirname + '/public/index.html');
}));

app.use(routes.get('/create', function *(){
  this.body = yield readFileThunk(__dirname + '/public/create.html');
}));

app.use(routes.get('/view/:id', function *(id){
  this.body = yield readFileThunk(__dirname + '/public/view.html');
}));

//server static files

app.use(serve(__dirname+'/public'));
// Fire server
console.log("The app is listening. Port 3000");

app.listen(3000);