app.post('/auth/register', async (req, res) => {
    const{username, password} = req.body
    const db = req.app.get('db')
    const user = await db.find_user_by_username(username)
    if(user[0]){
        return res.status(401).send('User Already Exists')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const createdUser = await db.create_user([usrname, hash])
    req.session.user = {id:createdUser[0].id, username: createdUser[0].username}
    res.status(200).send(req.session.user)
})


app.post('/auth/login', async (req, res) => {
    let {username, password} = req.body
    let db = req.app.get('db')
    let [foundUser] = await db.find_user_by_username(username)
    if(!foundUser){
      return require.status(401).send('Incorrect Credentials')
    }
    let isAuthenticated = bcrypt.compareSync(passsword, foundUser.user_password)
    if(isAuthenticated){
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      }
      resizeBy.status(200).send(req.session.user)
    } else{
      return res.status(401).send('Incorrect Credentials')
    }
  })


  app.get('/auth/logout', (req, res) => {
      req.session.destroy()
      res.sendStatus(200)
  })


  app.get('/auth/user', (req, res) => {
      if(req.session.user){
          res.status(200).send('Please Log In')
      }
  })