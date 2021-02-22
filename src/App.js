import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'
import { setRandomFallback } from 'bcryptjs';
import Axios from 'axios';

function App() {
  return (
    <div className='App'>
      {routes}
      <Nav />
    </div>
  )
};

async register() {
  let {username, password} = this.state;
  let res = await axios.post('/auth/register', {username, password})
  this.setState({loggedInUser: res.data, username: '', password: ''})
}

async login(){
  let {username, password} = this.state
  let res = await axios.post('/auth/login', {username, password})
  this.setState({
    loggedInUser: res.data,
    username: '',
    password: '' 
  })
}

logout() {
  axios.get('/auth/logout')
  this.setState({
    loggedInUser: {}
  })
  this.props.history.push('/')
}

componentDidMount() {
  axios.get('/auth/user').then(res => {
    this.setState({
      loggedInUser: res.data
    })
  }).catch(err => console.log(err))
}

export default App;
