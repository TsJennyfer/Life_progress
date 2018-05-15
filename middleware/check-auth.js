const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try {
        //const token = req.body.headers.authorization.split(" ")[1];
        const token = req.get('Authorization');
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsInVzZXJJZCI6IjVhZjJkOWJmNmQyZDQ1MDZlODBmNmFkMiIsImlhdCI6MTUyNjQwMDEzMiwiZXhwIjoxNTI2NDAzNzMyfQ.k5DKWy0eKrOrVTF_F65jLM7l5oNMh1tsBFVmGCWmhYw";
        console.log(token);
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};