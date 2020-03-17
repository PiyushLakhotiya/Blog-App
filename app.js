const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      express    = require('express'),
      app        = express();

mongoose.connect('mongodb://localhost:27017/Blog_App',{useNewUrlParser:true,useUnifiedTopology:true});

let BlogSchema = mongoose.Schema({
    title: String,
    image: String,
    body : String,
    created: {type:Date,default:Date.now}
});

let Blog = mongoose.model('Blog',BlogSchema);

Blog.create({
    title:'First Image',
    image:'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    body:"This is the sign you've been looking for neon signage"
});
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

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

app.listen(3000,function(){
    console.log("Server Started!!!");
});