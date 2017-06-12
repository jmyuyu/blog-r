var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var dizhi="mongodb://localhost:27017/data"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/from', function(req, res, next) {
 
  var zhu=req.body['zhu'];
  var pas=req.body['pass'];
   var  xing=req.body['xing'];
   var shou=req.body['shou'];
   var you=req.body['you'];
    
  var insertData=function(db,callback){
  	var conn=db.collection('info')
  	var data=[{user:zhu,pass:pas,shou:shou,you:you,xing:xing,}]
  	conn.insert(data,function(err,result){
  		callback(result)
  	})
  }
  
  
  mongodb.connect(dizhi,function(err,db){
  	if(err){
  		console.log("失败")
  	}else{
  		insertData(db,function(result){
  			res.redirect('/login')
  			db.close();
  		})
  	}
  })
  
  
  
});


router.post('/login',function(req,res,next){

  var zhu=req.body['zhu'];
  var pas=req.body['pass'];
    
    
  var findData=function(db,callback){
  	var conn=db.collection('info')
  	var data={user:zhu,pass:pas}
  	conn.find(data).toArray(function(err,result){
  		callback(result)
  	})
  }
  
  
  mongodb.connect(dizhi,function(err,db){
  	if(err){
  		console.log("失败")
  	}else{
  		findData(db,function(result){
  			if(result.length>0){
  				req.session.user=result[0].user
  				res.redirect('/')
  				db.close()
  			}else{
  				res.redirect('/login')
  				db.close()
  			}
  		})
  	}
  })
	
})





router.post('/liuyan', function(req, res, next) {
 if(req.session.user){
  var bt=req.body['bt'];
  var txt=req.body['txt'];
    
    
  var insertData=function(db,callback){
  	var conn=db.collection('liuyan')
  	var data=[{title:bt,content:txt}]
  	conn.insert(data,function(err,result){
  		callback(result)
  	})
  }
  
  
  mongodb.connect(dizhi,function(err,db){
  	if(err){
  		console.log("失败")
  	}else{
  		insertData(db,function(result){
  			res.redirect('/')
  			db.close();
  		})
  	}
  })
  }else{
  	res.send('登账号')
  }
  
  
});














module.exports = router;
