const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')

// Models
const User = require('../models/user')

const bearer = new BearerStrategy(
  async (token, done) => {
    try {
      // Controlla che il token sia valido e quindi è stato generato con la secretKey
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwtSecret')
      const user = await User.findById(decoded._id)
      if (!user) {
        return done(null, false, 'Non è stato eseguito l\'accesso con un account valido.')
      }

      // Restituisce lo user associato al token
      done(null, user)
      // done(null, JSON.parse(JSON.stringify(user)))
    } catch (e) {
      return done(e)
    }
  }
)

module.exports = {
  bearer
}
