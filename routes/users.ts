import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users";




const UsersRoute: Router = Router();


UsersRoute.route('/')
    .get(getAllUsers)
    .post(createUser)

UsersRoute.route('/:id')
    .get(getUser)
    .put (updateUser)
    .delete(deleteUser)

export default UsersRoute;