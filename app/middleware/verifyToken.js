function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (process.env.SECRET_KEY == token) 
    {
        next();
    }
    else
    {
        res.sendStatus(401);
    }
}

module.exports = verifyToken;