import User from './models/user.js';
import jwt from 'jsonwebtoken'
const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,'sehr_geheimer_schluessel');
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
        return next(error);
    }
}

export default isAuthenticated;