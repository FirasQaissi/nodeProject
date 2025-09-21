const chalk = require("chalk");
const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../services/userService");
const { auth } = require("../../auth/authService");

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      handleError(res, 403, "Authorization Error: Must be admin!");
    }
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id.toString()  !== id && !isAdmin) {
    return  handleError(
        res,
        403,
        "Authorization Error: Must be admin or THE registered user!"
      );
    }

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    console.log(chalk.greenBright(`New user registered:  ${user.email}`));
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    console.log(chalk.greenBright(`User logged in:  ${req.body.email}`));
    return res.status(200).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
     if (req.user._id.toString() !== id) {
      return handleError(res, 403, "You can update only your own profile!");}
   const user = await updateUser(id, req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  if (_id !== id) {
    return handleError(res, 403, "Unauthorized: Only the user can change their business status");
  }

  try {
    const user = await getUser(id);
    if (!user) return handleError(res, 404, "User not found");

    user.isBusiness = true?!user.isBusiness:user.isBusiness;
    await user.save();
    console.log(chalk.blueBright(`User ${user._id} business status changed to ${user.isBusiness}`));
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});


router.delete("/:id",auth, async (req, res) => {
  const {id} = req.params;
  const { _id, isAdmin } = req.user;
  if (!isAdmin && _id !== id) {
    return handleError(res, 403, "You can delete only your own profile!");
  }
  try {
   

    const user = await deleteUser(id);
    console.log(chalk.redBright(`User ${req.body.email} deleted by ${_id}`));
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;