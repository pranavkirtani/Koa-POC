var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");

// routes
var blogRoutes = require("./blogRoutes.js");
app.use(routes.post("/", blogRoutes.add));
app.use(routes.get("/:id", blogRoutes.get));
app.use(routes.put("/:id", blogRoutes.update));
app.use(routes.del("/:id", blogRoutes.remove));

//comment routes

app.use(routes.post("/comments", blogRoutes.addComments));
app.use(routes.get("/comments/:id", blogRoutes.getComments));
app.use(routes.put("/comments/:id", blogRoutes.updateComments));
app.use(routes.del("/comments/:id", blogRoutes.removeComments));


// Fire server
console.log("The app is listening. Port 3000");
app.listen(3000);