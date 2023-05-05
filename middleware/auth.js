const jwt = require("jsonwebtoken")
const jwtkey = "watch";

function verifyToken(req, res, next) {
    const token = req.headers["authorization"]
    if (token) {
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please add valid token " })
            } else {
                next();
            }
        })
    } else {
        res.send({ result: "please add token with headers" })
    }


}


module.exports = verifyToken;