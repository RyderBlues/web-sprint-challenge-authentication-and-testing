const Users = require('./auth-model')

const checkCredentials = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        next({status: 400, message: 'username and password required'})
    }
    else {
        next()
    }
}

const checkUsernameTaken = async (req, res, next) => {
    try {
        const [user] = await Users.findBy({username: req.body.username})
        if (!user) {
            next()
        }
        else {
            next({status: 401, message: 'username taken'})
        }
    }
    catch (err) {
        next(err)
    }
}

const checkUsernameExists = async (req, res, next) => {
   try {
    const [user] = await Users.findBy({username: req.body.username})
    if (!user) {
      next({ status: 401, message: 'invalid credentials'})
    } 
    else {
      req.user = user
      next()
    }
   }
   catch (err) {
    next(err)
   }
  }





module.exports = {
    checkCredentials,
    checkUsernameTaken,
    checkUsernameExists,
}