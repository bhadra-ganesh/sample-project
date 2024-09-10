const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Import cookie parser

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt_token; 
    console.log("Token from cookie: ", token);

    if (!token) return res.sendStatus(401); 

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateUser;
