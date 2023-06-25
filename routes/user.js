import express from "express";
import { registration } from "../middleware/authmiddleware.js";
import { Accessdata, regenerate, register } from "../Controller/usercontroller.js";
 var router = express.Router();

router.post('/registration',registration,register)
router.post('/regenerate',regenerate)
router.post('/Accessdata',Accessdata)


 export default router;