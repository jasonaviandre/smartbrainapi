const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jasonaviandre',
      password : '',
      database : 'smartbrain'
    }
  });




const app = express();
app.use(express.json()) //new way of using bodyParser, inside the express
app.use(cors())


app.get('/', (req,res) => {
    res.send('success'); //when it first changed, the server is restarting so that the object is not updating
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})






// Load hash from your password DB.


app.listen(3000, () => {
    console.log('app is running on port 3000')
})

// --> res = this is working
// signin --> POST = success/fail
// register --> POST = user
// profile/:userId --> GET = user
// image --> PUT --> user