import {verifyToken} from "../lib/jwt.js";
import {UserService} from "../modules/user/user.service.js";
import {ResData} from "../common/resData.js";
import {UserRepository} from "../modules/user/user.repository.js";


export class AuthorizationMiddleware {
    async authorization(req, res, next) {
        const userId = req.userId;
        console.log(userId)
        const userRepo = new UserRepository()
        const foundUser = await userRepo.getById(Number(userId));
        console.log(foundUser)
        if (foundUser && foundUser.role) {
            req.user = foundUser;
            return next();
        } else {
            const resData = new ResData(
                `No user found for this ${userId}. Please check the list of users.`
            );
            return res.status(403).json(resData);
        }
    }

    adminRole(req, res, next) {
        if (req.user.role === "admin") {
            next();
        } else {
            const resData = new ResData(
                "This user's role is not admin! Try again."
            );
            return res.status(403).json(resData);
        }
    }

    userRole(req, res, next) {
        if (req.user.role === "user") {
            next();
        } else {
            const resData = new ResData("Not access");
            return res.status(403).json(resData);
        }
    }

    checkUser(req, res, next) {
        try {
            const token = req.headers.token;
            const userId = verifyToken(token)
            req.userId = Number(userId.data);
            next();
        } catch (error) {
            const resData = new ResData("Invalid Token", 401, null, error);
            res.status(401).json(resData);
        }
    }
}