var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Cart = require('../models/cart');
const bcrypt = require('bcrypt');


router.get('/register', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						console.log(personInfo.password);
						password = personInfo.password.toString();
					  bcrypt.hash(password, 10,function(err, hash) {
if(err){
	console.log(err);
}
else{
	var newPerson = new User({
		unique_id:c,
		email:personInfo.email,
		username: personInfo.username,
		password: hash,
	});

	newPerson.save(function(err, Person){
		if(err)
			console.log(err);
		else
			console.log('Success');
	});
}
						});

					

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
	
		if(data){
			return res.render('home.ejs');
		}else{

			return res.render('login.ejs');
		}
	});
});

router.post('/', function (req, res, next) {
	console.log(req.body)
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			const passwordCompare = bcrypt.compare(data.password, req.body.password);
			if(passwordCompare){
				req.session.userId = data.unique_id;
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {

		req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{

			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});
// from here there are routes after login
router.get('/home', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('home.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.post('/cart',function(req,res,next){


	Cart.findOne({item:req.body.product},function(err,data){
		if(data){
			data.count = Number(data.count) + 1;
			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Item added to cart!"});
			});
		}else{
			var cart = new Cart({
				item:req.body.product,
				price:req.body.price,
				count:1,
			});
			cart.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Added to cart');
			});
			
		}

	})



});
router.get('/cart', function (req, res, next) {

	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			Cart.find({},function(err,data){
				if(data){
					console.log(data);
					return res.render('cart.ejs', {"cart":data});
				}else{
					return res.render('cart.ejs');
				}	
			})

		}
	});
});

router.get('/shop', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('shop.ejs', {});
		}
	});
});

router.get('/checkout', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('checkout.ejs', {});
		}
	});
});


router.get('/contact', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('contact-us.ejs', {});
		}
	});
});
router.get('/about', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('about.ejs', {});
		}
	});
});

router.get('/success', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{

			return res.render('success.ejs', {});
		}
	});
});




module.exports = router;