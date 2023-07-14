const express = require("express");
const UserController = require("../controllers/userController");
const JobController = require("../controllers/jobController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/jobs", JobController.getAll);
router.get("/jobs/:id", JobController.getJobById);
module.exports = router;
