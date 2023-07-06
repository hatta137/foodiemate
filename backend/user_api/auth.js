import User from './models/user.js';
import jwt from 'jsonwebtoken'
const isAuthenticated = async (req,res,next)=>{
    try {
        let {token} = req.cookies;
        if(!token){
            token = req.cookies._auth;
        }
        const verify = await jwt.verify(token,'sehr_geheimer_schluessel');
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
        return next(error);
    }
}
export default isAuthenticated;