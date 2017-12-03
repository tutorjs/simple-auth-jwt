const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: 'password'
  }
];

/**
* Home.
* `GET http://localhost:3000`
*/
app.get('/', (req, res) => {
  res.status(200).json({
    meta: {
      code: 200,
      success: true
    },
    message: 'Welcome to homepage!'
  });
});

/**
* Login.
* `POST http://localhost:3000/login`.
*/
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  /**
   * Error message.
   */
  const errorMessage = {
    meta: {
      code: 401,
      status: 'Unauthorized'
    }
  };

  /**
   * Generate token
   */
  const generateToken = (err, token) => {
    if (err) {
      return res.status(401).json(errorMessage);
    }
    return res.redirect('/user?token=' + token);
  };

  if (email) {

    const matchUserEmail = user => email === user.email;
    const user = users.find(matchUserEmail);
    
    if (user) {
      const matchEmailAndPassword = (email === user.email) && (password === user.password);
      if ( matchEmailAndPassword ) {
        jwt.sign(user, 'secret', generateToken);
      } else {
        res.status(401).json(errorMessage);
      }
    } else {
      res.status(401).json(errorMessage);
    }

  } else {
    res.status(401).json(errorMessage);  
  }
  
});

/**
 * User.
 * `GET http://localhost:3000/user?token=value`
 */
app.get('/user', (req, res) => {
  const token = req.query.token;
  if (token) {
    const decodeToken = jwt.decode(token);
    return res.status(200).json({
      meta: {
        code: 200,
        success: true
      },
      user: {
        email: decodeToken.email,
        password: decodeToken.password,
        token: token
      }
    });
  } else {
    return res.redirect('/');
  } 
});

/**
* Auth Middleware
*/
const authMiddleware = (req, res, next) => {
  const token = req.query.token;
  if (token) {
    const decodeToken = jwt.verify(token, 'secret', function(err, decodeToken) {
      if (err) {
        return res.status(401).json({
          meta: {
            code: 401,
            success: false
          },
          message: 'Failed authenticated token!'
        });
      } else if (decodeToken) {
        return next();
      }
    });
  } else {
    return res.status(401).json({
      meta: {
        code: 401,
        success: false
      },
      message: 'Please provided token!'
    });
  }
};

/**
* Protected Page.
* `GET http://localhost:3000/protected`
*/
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    meta: {
      code: 200,
      success: true
    },
    message: 'Protected page!'
  });
});

module.exports = app;