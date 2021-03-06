const jwt = require('jsonwebtoken');
const secret = "Everyone lies";

const coach = (req, res, next) => {

    try {
        if(!req.headers.authorization){
            throw new Error("Access denied");
        }
    
        let token = req.headers.authorization.split(' ')[1];    
        let auth = jwt.verify(token,secret);
        if (auth.isAdmin == true){
            return next();
        } else if (!auth.isCoach){
            throw new Error("No tienes permiso para realizar esta acción");
        }
        return next();
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = coach;