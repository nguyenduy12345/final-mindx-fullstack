import jwt from 'jsonwebtoken'
import { findUserDB } from '../models/users.model.js';

const authMiddleware = {
    authentication: async (req, res, next) => {
      const authToken = req.headers['authorization']
      try {
        const token = authToken && authToken.split(' ')[1]
        if(!token) throw new Error('Please login again')
        const verifyToken = jwt.verify(token, process.env.ACCESS_TK_KEY)
        const { _id } = verifyToken
        const user = await findUserDB({_id})
        if(!user) throw new Error('Unauthorized')
        if(!user.isLogin) throw new Error('Unauthorized')
        req.data = _id
        next();
      } catch (error) {
        res.status(401).send({
            message: error.message
        })
      }
    }
};
export default authMiddleware;