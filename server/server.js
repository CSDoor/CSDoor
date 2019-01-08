const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./router.js')
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const expressSession = require('express-session');
require('dotenv').config();

// parse cookies and body
app.use(expressSession({
  secret: 'linkinOauth',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//LINKINED IN OAUTH
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());
//app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    //PULL FROM DB
    done(null, id)
});

passport.use('linkedin', new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://localhost:5000/linkedInOauth",
    scope: ['r_emailaddress', 'r_basicprofile']
  }, function(accessToken, refreshToken, profile, done) {
    //asynchronous verification, for effect...
      //HANDLE DATA CREATION
      console.log('positions', profile._json.positions); 
      const user = {
          id: profile.id,
          name: profile.displayName,
          cohort: 23,
          companyId: '',
          jobTitle: profile._json.headline
      }
      console.log("user", user)
      //REGISTER IN DB
      return done(null, profile);
  }));

app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.get('/linkedInOauth', passport.authenticate('linkedin',  {
    successRedirect:'/home',
    failureRedirect:'/error'
}));

app.get('/error', (req, res, next) => {
  console.log('ERROR');
  console.log(req.user);
  res.send('error')
});

app.get('/test', (req, res, next) => {
  console.log('ERROR');
  console.log(req.user);
  res.send('test')
})

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

// serve static files
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/home', express.static(path.join(__dirname, '../public')))


// route get and post requests to router
router(app);

// create port
const PORT = 5000; 
app.listen(PORT, console.log(`listening on port ${PORT}`))
