const express = require('express')


module.exports = function(app){


  function requireLogin (req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      User.findOne( { email: req.session.user.email})
      .then( (user) => {
        res.locals.user = user
        req.session.user = user
        next();
      })
    }
  };

  //routes

  app.get('/login', (req, res) => {
    res.render('login')
  });

  app.post('/loginhandler', (req, res) => {
    console.log(req.body.user)
    User.findOne( { where:  {user: req.body.user} })
      .then(function(user) {
      if (!user.user) {
        console.log('no user found')
        res.render('login', { err: 'User or password is incorrect'})
      } else {
        if (req.body.password === user.password) {
          console.log('password is the same')
          req.session.user = user
          req.user = user
          res.redirect('/')
        } else {
          console.log("password is wrong")
          res.render('login', { err: 'User or password is incorrect'})
        }
      }
    });
  });

  app.get('/signup', (req, res) => {
    res.render('signup')
  });

  app.post('/signuphandler', (req, res) => {
    req.session.destroy()
    User.create({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password
        })
    .then( () => {
      res.redirect('/login')
      })
  })

  app.get('/', requireLogin, (req, res) => {
    if (req.session.user) {
      User.findOne({ email: req.session.user.email})
      .then( (user) => {
        if(!user) {
          req.session.reset();
          res.rederict('/login');
        } else {
          res.locals.user = user;
          Message.findAll()
          .then((messages) => {
            res.render('messages', {messages: messages})
          })
        }
      })
    } else {
      res.redirect('/login')
    }
  })

  // app.get('/', (req, res) => {
  //   if (!req.session.user) res.redirect('login')
  // db
  //     .sync()
  //     .then(function(){
  //       var messages = Message.findAll({ limit: 15})
  //     .then(function(messages) {
  //       res.render('index', {posts: messages, status: ""})
  //     })
  //   })
  // })

  app.get('/message:message:id'), (req, res) => {
    res.render('post')
  }

  app.get('/user/:id', requireLogin, (req, res) => {
    Message.findAll({ where: { userId: req.session.user.id} })
    .then( (messages) => {
      res.render('user', { messages: messages, user: req.session.user} )
    })
  })

  app.get('/post/:id', requireLogin, (req, res) => {
    Comment.findAll({ where: { messageId: req.params.id } })
      .then( (comments) => {
        console.log(comments)
        res.send( {comments: comments} )
      })
    })

  app.get('/form', requireLogin, (req, res) => {
      res.render('form', {user: req.session.user})
  })

  app.post('/formhandler', (req, res) => {
    const user = req.session.user.userId
    console.log('user:' + user)
    User.findOne({ userId: user })
    .then( (user) => {
      user.createMessage({
        title: req.body.title,
        text: req.body.text
        })
      })
    .then( () => {
      res.redirect('/')
      })
  })

  app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(req.session)
    res.redirect('/login')
  })
}
