import { Router } from "express"
import { createUser, logIn, logOut } from "../controllers/user.controllers.js"
import authMiddleware from "../middlewares/auth.middlewares.js"
const UserRouter = Router()
UserRouter.post('/register', createUser)
UserRouter.post('/login', logIn)
UserRouter.patch('/logout', authMiddleware.authentication, logOut)

export default UserRouter