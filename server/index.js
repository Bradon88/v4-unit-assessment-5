import {HashRouter} from 'react-router-dom'
require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts'),
      massive = require('massive');
const { Database } = require('massive');
      
const app = express();

app.use(express.json());

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.listen(SERVER_PORT, () => {
    console.log(`Server on port ${SERVER_PORT}`)
})

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('Database Connected')
})
.catch((err) => console.log(err))


ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
           <App />
        </HashRouter>
    </React.StrictMode>
    , document.getElementById('root')
  )



// Auth Endpoints
// app.post('/api/auth/register', userCtrl.register);
// app.post('/api/auth/login', userCtrl.login);
// app.get('/api/auth/me', userCtrl.getUser);
// app.post('/api/auth/logout', userCtrl.logout);

// Post Endpoints
// app.get('/api/posts', postCtrl.readPosts);
// app.post('/api/post', postCtrl.createPost);
// app.get('/api/post/:id', postCtrl.readPost);
// app.delete('/api/post/:id', postCtrl.deletePost)

