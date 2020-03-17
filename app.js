const methodOverride = require('method-override'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      express        = require('express'),
      app            = express();

mongoose.connect('mongodb://localhost:27017/Blog_App',{useNewUrlParser:true,useUnifiedTopology:true});

let BlogSchema = mongoose.Schema({
    title: String,
    image: String,
    body : String,
    created: {type:Date,default:Date.now}
});

let Blog = mongoose.model('Blog',BlogSchema);
mongoose.set('useFindAndModify', false);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',function(req, res) {
    res.redirect('/blogs');
});

app.get('/blogs',function(req, res) {
    Blog.find({},function(err,blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render('index',{blogs:blogs});
        }
    });
});

app.get('/blogs/new',function(req,res) {
    res.render('new');
});

app.post('/blogs',function(req,res) {
    let blog = {
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body
    }
    Blog.create(blog,function(err,blogCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id',function(req,res) {
    Blog.findById(req.params.id,function(err,foundBlog) {
        if(err) {
            console.log(err);
        } else {
            res.render('show',{blog:foundBlog});     
        }
    });
});

app.get('/blogs/:id/edit',function(req,res) {
    Blog.findById(req.params.id,function(err,foundBlog) {
        if(err) {
            console.log(err);
        } else {
            res.render('edit',{blog: foundBlog});
        }
    });
});

app.put('/blogs/:id',function(req,res) {
    let updatedBlog = {
        title : req.body.blog.title,
        image : req.body.blog.image,
        body  : req.body.blog.body
    };
    Blog.findByIdAndUpdate(req.params.id,updatedBlog,function(err,updateBlog) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/blogs/'+ req.params.id);
        }
    });
});

app.delete('/blogs/:id',function(req,res) {
    Blog.findByIdAndRemove(req.params.id,function(err,deleteBlog) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/blogs');     
        }
    });
});

app.listen(3000,function(){
    console.log("Server Started!!!");
});