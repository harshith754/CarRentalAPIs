import { json } from "express";
import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.json({
          status: 403,
        });
      }

      if (user.role != "ADMIN") {
        return res.json({
          status: 403,
          message: "You are not an admin.",
        });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    return res.json({
      status: 403,
      message: e.message,
    });
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.json({
          status: 403,
        });
      }

      req.user = user;

      console.log(user);
      next();
    });
  } catch (e) {
    return res.json({
      status: 403,
      message: e.message,
    });
  }
};
