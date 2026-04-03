const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout,staffuser,manageruser,adminuser,removeuser,updateUserRole}=require('../controller/authcontroller')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')






router.post("/signup",signup)
router.post("/login",login)
router.patch("/updateRole/:UserId",authmiddleware,adminmiddleware,updateUserRole)
router.delete("/removeuser/:UserId",authmiddleware,adminmiddleware,removeuser)
router.get("/staffuser",authmiddleware,staffuser)
router.get("/manageruser",authmiddleware,manageruser)
router.get("/adminuser",authmiddleware,adminuser)
router.post("/logout",authmiddleware,logout)
router.put("/updateProfile",authmiddleware,updateProfile)









module.exports=router