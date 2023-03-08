import { Router } from "express";
import { getUserInfo, addUser, login, getUsersInfo, changeStatus, modifyUserInfo, deleteUser} from "../controllers/user.controllers.js";

const router = Router()

//GET profile
router.get('/all', getUsersInfo)

//Login
router.post('/login', login)

//User Info
router.get('/profile', getUserInfo)

//Modify user Info
router.post('/profile', modifyUserInfo)

//Delete user Info
router.delete('/profile', deleteUser)

//ADD new user
router.post('/register',addUser)

//ADD new user
router.put('/admin/:id',changeStatus)

export default router