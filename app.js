const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      express    = require('express'),
      app        = express();

mongoose.connect('mongod://localhost:27017/Blog App',{useNewUrlParser:true,useUnifiedTopology:true});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,function(){
    console.log("Server Started!!!");
});