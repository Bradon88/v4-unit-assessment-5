import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store.js'
require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts'),
      massive = require('massive');
      session = require('express-session')
      bcrypt = require('bcryptjs')
const { Database } = require('massive');

      
const app = express();

app.use(express.json());

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.listen(SERVER_PORT, () => {
    console.log(`Server on port ${SERVER_PORT}`)
})

//Database

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then((db) => {
    app.set('db', db)
    console.log('Database Connected')
})
.catch((err) => console.log(err))

//Authentication

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
    })
)

//Routes

ReactDOM.render(
    <React.StrictMode>
       <Provider {store}>
        <HashRouter>
           <App />
        </HashRouter>
       </Provider> 
    </React.StrictMode>
    , document.getElementById('root')
  )



// Auth Endpoints

app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// Post Endpoints

app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

