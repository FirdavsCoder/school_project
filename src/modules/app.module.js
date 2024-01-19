import { Router } from "express";
import user from "./user/user.module.js";
import brandModule from "./brand/brand.module.js";

const router = Router();

router.use("/user", user.router);
router.use("/brand", brandModule.brandRouter)

export default { router };
