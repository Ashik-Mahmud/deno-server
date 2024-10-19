import { Router } from "oak";
import { createUserController, getUserController, getUsers } from "../controllers/userController.ts";


const router = new Router();

router.get("/users", getUsers);
router.post("/users", createUserController);
router.get("/users/:id", getUserController);

export default router;
