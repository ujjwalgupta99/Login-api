const router = require("express").Router();
const { getStudents, getStudentsID, createUser, updateUser,login } = require("./user.service");
const { validationBody,schemas} = require("../helper/validation");
const { tokenVerification }= require("../helper/tokenVerification")

router.post("/", [tokenVerification(),validationBody(schemas.registerValidation)], createUser);
router.get("/details", getStudents);
router.get("/student", getStudentsID);
router.post("/update",[tokenVerification(),validationBody(schemas.updatevalidation)], updateUser);
router.get("/login",login);

module.exports= router;