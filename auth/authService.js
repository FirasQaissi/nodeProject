const {verifyToken} = require("./Providers/jwt");
const {handleError} = require("../utils/errorHandler");
const config = require("config");
const { token } = require("morgan");



const tokenGenerator = config.has("TOKEN_GENERATOR") ? config.get("TOKEN_GENERATOR") : "jwt";
const auth = (req, res, next) => {
   if(tokenGenerator === "jwt" ){
    try {
        const tokenFromClient = req.header("x-auth-token");
        if(!tokenFromClient){
            
            throw new Error("Access denied. Please Login!.");
        }
        const userData = verifyToken(tokenFromClient);
        if(!userData){
            throw new Error("Unauthorize User");
        } else {
            req.user = userData;
           return next();
        }
    } catch (error) {
      return  handleError(res, 401, error.message);
    }
   }
   return handleError(res, 501, "Use jwt");

 
};

exports.auth = auth;