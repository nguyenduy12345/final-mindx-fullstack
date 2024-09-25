import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { createUserDB, findUserDB, updateUserDB } from "../models/users.model.js";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUserName = await findUserDB({ username });
    if (checkUserName) throw new Error("Username is existed");
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await createUserDB({
      username,
      email,
      password: hash,
    });
    res.status(201).send({
      message: "created success",
      data: newUser,
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserDB({ username });
    if (!user) throw new Error("username or password is wrong");
    if (user.banned) throw new Error("account is banned");
    const checkPassword = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!checkPassword) throw new Error("username or password is wrong");
    const { _id } = user;
    const accesstoken = jwt.sign(
      { _id },
      process.env.ACCESS_TK_KEY
    );
    const refreshtoken = jwt.sign(
      { _id },
      process.env.REFRESH_TK_KEY
    );
    user.accesstoken = accesstoken 
    user.refreshtoken = refreshtoken;
    user.isLogin = true
    await user.save();
    res.status(201).send({
      message: "login success",
      data: {
        user
      }
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};

const logOut = async (req, res) => {
  const _id = req.data
  try {
    await updateUserDB({
      _id
    },{
      accesstoken: null,
      refreshtoken: null,
      isLogin: false
    })
    const user = await findUserDB({_id})
    res.status(201).send({
      message: "logout success",
      data: {
        user
      }
    })
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
export { createUser, logIn, logOut };
