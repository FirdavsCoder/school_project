import { Router } from "express";
import user from "./user/user.module.js";
import brandModule from "./brand/brand.module.js";
import schoolModule from "./school/school.module.js";


const router = Router();

router.use("/user", user.router);
router.use("/brand", brandModule.router);
router.use("/school", schoolModule.router)

export default { router };
