import { Router } from "express";
import user from "./user/user.module.js";
import brandModule from "./brand/brand.module.js";
import schoolModule from "./school/school.module.js";
import user_parentModule from "./user_parents/user_parent.module.js";
import roomModule from "./room/room.module.js";
import subjectModule from "./subject/subject.module.js";


const router = Router();

router.use("/user", user.router);
router.use("/brand", brandModule.router);
router.use("/school", schoolModule.router);
router.use("/user-parent", user_parentModule.router);
router.use("/room", roomModule.router);
router.use("/subject", subjectModule.router);

export default { router };
