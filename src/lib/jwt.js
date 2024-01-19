import jwt from "jsonwebtoken";

import { config } from "../common/config/index.js";

export const generateToken = (data) => {
  const token = jwt.sign({ data, exp: config.jwtExpiredIn }, config.jwtKey);
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtKey);
};
