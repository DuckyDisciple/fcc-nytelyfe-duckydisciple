"use strict";

var path = process.cwd();
// var jade = require('jade');

// var ClickHandler = require(process.cwd()+"/app/controllers/clickHandler.server.js");

module.exports=function(app, passport){
    
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/login');
        }
    }
    
    // var clickHandler = new ClickHandler();
    
    app.route('/')
        .get(function(req,res){
            res.sendFile(path+"/client/index.html");
        });
        
    app.route('/login')
        .get(function(req,res){
            res.sendFile(path+"/client/login.html");
        });
    
    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        });
    
    app.route('/edit')
        .get(function(req, res) {
            // res.sendFile(path+"/client/editPoll.html");
            // res.render('editPoll',{pollTitle: "Test", pollDesc: "This is a test.", pollOptions: ["Red","Blue","Green"]});
            res.render('editPoll',{});
        });
    
    app.route('/edit/:id')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path+"/client/editPoll.html");
        });
    
    // app.route('/profile')
    //     .get(isLoggedIn, function(req,res){
    //         res.sendFile(path+"/client/profile.html");
    //     });
    
    app.route('/api/git/:id')
        .get(isLoggedIn,function(req, res) {
            res.json(req.user.github);
        });
    
    app.route('/api/g/:id')
        .get(isLoggedIn, function(req, res){
            res.json(req.user.google);
        });
    
    // app.route('/auth/github')
    //     .get(passport.authenticate('github'));
    
    // app.route('/auth/github/callback')
    //     .get(passport.authenticate('github',{
    //         successRedirect: '/',
    //         failureRedirect: '/login'
    //     }));
    
    app.route('/auth/google')
        .get(passport.authenticate('google',{ scope: ['profile','email'] }));
    
    app.route('/auth/google/callback')
        .get(passport.authenticate('google',{
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    
    // app.route('/api/:id/clicks')
    //     .get(isLoggedIn, clickHandler.getClicks)
    //     .post(isLoggedIn, clickHandler.addClick)
    //     .delete(isLoggedIn, clickHandler.resetClicks);
    
    // app.route('/api/git/:id/clicks')
    //     .get(isLoggedIn, clickHandler.getClicks)
    //     .post(isLoggedIn, clickHandler.addClick)
    //     .delete(isLoggedIn, clickHandler.resetClicks);
    // app.route('/api/g/:id/clicks')
    //     .get(isLoggedIn, clickHandler.getClicks)
    //     .post(isLoggedIn, clickHandler.addClick)
    //     .delete(isLoggedIn, clickHandler.resetClicks);
};