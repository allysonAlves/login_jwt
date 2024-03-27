const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const errorMessage = { erro: "Token JWT inválido ou ausente. Faça login para acessar esta rota." }

    if (token == null) 
      return res.status(401).json(errorMessage);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.status(403).json(errorMessage)
  
      req.user = user
  
      next()
    })
}

module.exports = { authenticateToken, generateAccessToken }