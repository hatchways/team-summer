const {decodeToken} = require('../utils');

exports.verifyJwt = (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization) {
        const token = authorization.split(' ')[1];
        const decodedToken = decodeToken(token);
        req.user = decodedToken.payload;
        next();
    } else {
        res.status(500).send({error: 'JWT token missing!!!'})
    }
}