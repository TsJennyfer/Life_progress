const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try {
        const token = req.body.headers.authorization.split(" ")[1];
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsInVzZXJJZCI6IjVhZjJkOWJmNmQyZDQ1MDZlODBmNmFkMiIsImlhdCI6MTUyNjM5NTUyNCwiZXhwIjoxNTI2Mzk5MTI0fQ.qqWCQjRSMhanGeWIYhPSGKpLKVclkJuShyxGJPw9lqw";
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