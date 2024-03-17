const {
    signUp,
    deleteUser,
    getAllUsers,
    getUserById,
    login,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.post("/", signUp);
  router.post("/login", login);
  router.delete("/:id", deleteUser);
  router.get("/", getAllUsers);
  router.get("/:id", getUserById);
    
  module.exports = router;