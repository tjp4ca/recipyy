// auth in SERVER utils

require('dotenv').config();

const jwt = require('jsonwebtoken');

const expiration = '1h';
// const expiration = process.env.expiration

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
          const { data } = jwt.verify(token, process.env.secret, { maxAge: expiration });

          req.user = data;
        } catch {
          console.log('Invalid token');
        }
    
        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };

        console.log('dotenv error')
        console.log(process.env.expiration);

        return jwt.sign({ data: payload }, process.env.secret, { expiresIn: expiration });

    }
}
