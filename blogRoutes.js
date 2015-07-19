var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/Blogproject");
var blogs = wrap(db.get("blogs"));
console.log(blogs);
module.exports.blogs = blogs;

module.exports.add = function * () {
console.log('in add');
	var postedBlog = yield parse(this);
    console.log(postedBlog);
	if(!exists(postedBlog.title)){
		this.set('ValidationError', 'Title is required');
		this.status = 200;
		return;
	};

	if(!exists(postedBlog.content)){
		this.set('ValidationError', 'Content is required');
		this.status = 200;
		return;
	};
       // postedBlog.comments=[];
	var insertedBlog = yield blogs.insert(postedBlog);

	this.set("location", this.originalUrl + "/" + insertedBlog._id);
	this.status = 201;
    console.log('end'+insertedBlog._id);
};

module.exports.getAll = function *() {
    console.log('inside getAll')
	var blog = yield blogs.find({});
    console.log(blog);
	this.body = blog;
    console.log("body aah");
	this.status = 200;
    console.log('status');
};


module.exports.get = function *(id) {
	var blog = yield blogs.findById(id);
	this.body = blog;
	this.status = 200;
};

module.exports.update = function * (id) {
	var blogFromRequest = yield parse(this);

	yield blogs.updateById(id, blogFromRequest);

	var prefixOfUrl = this.originalUrl.replace(id, "");
	this.set("location", prefixOfUrl + id);
	this.status = 204;
}

module.exports.remove = function * (id) {
	yield blogs.remove({_id : id});
	this.status = 200;
};









//comments



module.exports.addComments = function * () {
console.log('in comment');
    
 
	var postedBlog = yield parse(this);
       var blog = yield blogs.findById(postedBlog.id);
   
        if(blog.comments!=null){
            console.log(blog.comments);
            var comment_data={};
        comment_data.name=postedBlog.name;
        comment_data.date=new Date();
        comment_data.body=postedBlog.body
        blog.comments.push(comment_data);
        
        }
    else{
    
    blog.comments=[];
        var comment_data={};
        comment_data.name=postedBlog.name;
        comment_data.date=new Date();
        comment_data.body=postedBlog.body
        blog.comments.push(comment_data);
        
    }
	yield blogs.updateById(postedBlog.id, blog);
  var blog=yield blogs.findById(postedBlog.id);
this.status=201
this.body=blog
};

module.exports.getComments = function *(id) {
	var blog = yield blogs.findById(id);
	this.body = blog;
	this.status = 200;
};

module.exports.updateComments = function * (id) {
	var blogFromRequest = yield parse(this);

	yield blogs.updateById(id, blogFromRequest);

	var prefixOfUrl = this.originalUrl.replace(id, "");
	this.set("location", prefixOfUrl + id);
	this.status = 204;
}

module.exports.removeComments = function * (id) {
	yield blogs.remove({_id : id});
	this.status = 200;
};





var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	return true;
};