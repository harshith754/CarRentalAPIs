import prisma from "../db/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.json({
        status: 400,
        message: " Email already taken. Please choose another email.",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return res.json({
      status: 200,
      user_id: newUser.id,
      message: "Account successfully created.",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "An error occurred while registering the user.",
      status: 400,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return res.json({
        status: 400,
        message: " Email doesn't exist. Please register as a new user.",
      });
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result == true) {
        const token = jwt.sign(existingUser, process.env.SECRET);
        console.log("here");
        console.log(existingUser);

        return res.json({
          status: 200,
          message: "Login Successful.",
          token,
        });
      } else {
        return res.json({
          status: 401,
          message: "Incorrect username/password provided. Please retry",
        });
      }
    });
  } catch (error) {
    return res.json({
      message: "An error occurred while registering the user.",
      status: 500,
    });
  }
};

export const checkAuth = async (req, res) => {
  return res.json({
    status: 200,
    message: "user is authorized",
  });
};
