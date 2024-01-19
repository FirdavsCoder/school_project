import { Router } from "express";
import user from "./user/user.module.js";

const router = Router();

router.use("/user", user.router);

export default { router };
