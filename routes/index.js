var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var dizhi="mongodb://localhost:27017/data"




/* GET home page. */
router.get('/', function(req, res, next) {
	var findData=function(db,callback){
  	var conn=db.collection('liuyan')
  	conn.find({}).toArray(function(err,result){
  		callback(result)
  	})
  }
  
  
  mongodb.connect(dizhi,function(err,db){
  	if(err){
  		console.log("失败")
  	}else{
  		findData(db,function(result){
         res.render('index', { title: 'Express' ,user:req.session.user,result:result});
  		})
  	}
  })
  
});

router.get('/register', function(req, res, next) {
	
  res.render('register',{})
});

router.get('/login', function(req, res, next) {
  res.render('login',{})
});

router.get('/relogin', function(req, res, next) {
  req.session.destroy(function(err){
  	if(!err){
  		res.redirect('/')
  	}
  })
});

router.get('/liuyan', function(req, res, next) {

  var findData=function(db,callback){
  	var conn=db.collection('liuyan')
  	conn.find({}).toArray(function(err,result){
  		callback(result)
  	})
  }
  
  
  mongodb.connect(dizhi,function(err,db){
  	if(err){
  		console.log("失败")
  	}else{
  		findData(db,function(result){
         res.render('liuyan',{result:result})
  		})
  	}
  })
  
});













module.exports = router;
