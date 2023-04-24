const express = require('express')
const app = express()
const port = 2000

app.use(express.json())


let dbUsers = [
  {
      username: "Shivaranjini",
      password: "123456",
      name: "Shivaranjini",
      email: "ranjini3400@gmail.com"
  },
  {
      username: "john",
      password: "7891011",
      name: "John",
      email: "john@gmail.com"
  },
  {
      username: "Ali",
      password: "654321",
      name: "Ali",
      email: "ali@gmail.com"
  }
]

function login(reqUsername, reqPassword) {
  let matchUser = dbUsers.find(
      x => x.username == reqUsername
  )

  
  if(!matchUser) return "User not found!"
  if(matchUser.password == reqPassword) {
      return matchUser
  } else {
      return "Invalid password"
  }
}



//to register an account
function register(reqUsername, reqPassword, reqName, reqEmail){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name:reqName,
      email: reqEmail
  })
}

const jwt = require('jsonwebtoken');
function generateToken(userData){
    const token = jwt.sign(
        userData,
        'inipassword',
        {expiresIn: 60}
    );
    return token
}


function verifyToken(req, res, next){
    let header = req.headers.authorization
    console.log(header)

    let token = header.split(' ')[1]

    jwt.verify(token, 'inipassword', function(err,decoded){
        if(err){
            res.send("Invalid Token")
        }

        req.user = decoded
        next()
    });
}

app.post('/login', (req, res) => {
    console.log (req.body)

    let result = login(
      req.body.username, 
      req.body.password
      )
      
    let token = generateToken(result)
    res.send(token)
    
  })

app.get('/FKEKK', (req, res) => {
  res.send('Welcome to FKEKK!<3')
})

app.get('/UTeM', (req, res) => {
    res.send('Welcome to UTeM!')
  })

app.get('/bye', verifyToken, (req, res) => {
    res.send('No Hi!')
  })

app.post('/register', (req, res) => {    ///This will created and error because anything at address bar will only recognise GET command
  console.log (req.body)
  let result = register(
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.email
  )  
  res.send('result')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


