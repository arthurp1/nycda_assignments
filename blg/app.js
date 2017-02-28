const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/arthur');
const app = express()
app.locals.moment = require('moment');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//middleware
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
// app.use(bodyParser.json());
app.use(session({
    secret: 'session secret',
    resave: true,
    saveUninitialized: false
}));

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    User.findOne( {where: { email: req.session.user.email} } )
    .then( (user) => {
      req.session.user = user
      next();
    })
  }
};


//models
const User = db.define('user', {
  user:  Sequelize.STRING,
  email:  Sequelize.STRING,
  password:  Sequelize.STRING
});

const Message = db.define('message', {
  title: Sequelize.STRING,
  text: Sequelize.STRING
});

const Comment = db.define('comment', {
  comment:  Sequelize.STRING
});

User.hasMany(Message)
Message.belongsTo(User) // Will add a userId attribute to Message to hold the primary key value for user

Message.hasMany(Comment)
Comment.belongsTo(Message)

User.hasMany(Comment)
Comment.belongsTo(User)

//routes

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/loginhandler', (req, res) => {
  User.findOne( {where: {user: req.body.user} })
    .then(function(user) {
    if (!user.user) {
      console.log("no user found")
      res.render('login', { err: 'User or password is incorrect'})
    } else {
      if (req.body.password === user.password) {
        req.session.user = user
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

// user:
//  { dataValues: [Object],
//    _previousDataValues: [Object],
//    _changed: {},
//    '$modelOptions': [Object],
//    '$options': [Object],
//    hasPrimaryKeys: true,
//    __eagerlyLoadedAssociations: [],
//    isNewRecord: false },
// comments: [ [Object] ] } ]

app.get('/', requireLogin, (req, res) => {
    res.locals.user = req.session.user
    Message.findAll({
      include: [{ model: User }, {model: Comment}]
      })
    .then( (messages) => {
        console.log('messages[0].comment[0]')
        console.log(messages[0].comments[0])
        res.render('messages', {messages: messages} )
      })
})

app.get('/user', (req, res) => {
  const id = req.session.user.id
  res.redirect('/user/' + id)
})



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
  const user = req.session.user.id
  console.log('posting user:' + user)
  User.findOne({where: { id: user } })
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

app.post('/commenthandler', (req, res) => {
  Message.findOne({ id: req.body.messageId })
  .then( (message) => {
    message.createComment({
      comment: req.body.comment,
      userId: req.session.user.id
      })
    })
  .then( () => {
    res.redirect('/')
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login')
})


// app.get('/23', requireLogin, (req, res) => {
//   if (req.session.user) {
//     console.log('req.session.user home')
//     console.log(req.session.user)
//     User.findOne({ email: req.session.user.email})
//     .then( (user) => {
//       if(!user) {
//         req.session.reset();
//         res.rederict('/login');
//       } else {
//         res.locals.user = user;
//         Message.findAll({
//           include: [ User, Comment]
//         })
//       .then((messages) => {
//           // User.findAll
//           res.render('messages', {messages: messages} )
//         })
//       }
//     })
//   } else {
//     res.redirect('/login')
//   }
// })
//
// app.post('/', (req, res) => {
// db
//     .sync()
//     .then( () => {
//       Message.create({
//         creator: req.body.creator,
//         title: req.body.title,
//         body: req.body.body
//         })
//       })
//     .then(function () {
//       return Message.findAll()
//     })
//     .then(function(messages) {
//       console.log(messages)
//       res.render('index', {posts: messages, status: "Your message has been posted"})
//     })
// })
//
// app.get('/signup', (req, res) => {
//   res.render('signup')
// })
//
// app.post('/signup', (req, res) => {
//   db
//     .sync()
//     .then( () => {
//       User.create({
//         title,
//         body
//       })
//     })
// })



db.sync({force: true})
  .then( () => {
    User.create({
      user: 'Arthur',
      email: 'arthur.poot1@gmail.com',
      password: 'admin'
    }).then( (user) => {
      user.createMessage({
        title: 'This is so awesome',
        text: 'Text is so exciting, who needs pictures anyway'
      }).then( (message) => {
        message.createComment({
          comment: 'I don\'t like this post at all',
          userId: 1
        })
      })
    })
  })
    .then(function() {app.listen(3000, () => {
      console.log('server started')
    })
})
