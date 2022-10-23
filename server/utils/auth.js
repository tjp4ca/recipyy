// auth in SERVER utils

// require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = 'myrecipyysecrets';
const expiration = '1h';

module.exports = {
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        // bearer
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
    
        if (!token) {
          return req;
        }
    
        try {
        // verify token
          // const { data } = jwt.verify(token, process.env.secret, { maxAge: process.env.expiration });
          const { data } = jwt.verify(token, secret, { maxAge: expiration });

          req.user = data;
        } catch {
          console.log('Invalid token');
        }
    
        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };

        // secret in .env
        // return jwt.sign({ data: payload }, process.env.secret, { expiresIn: process.env.expiration });
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });

    }
}
