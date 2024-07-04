const userRouter = require("./user.router")
const express = require("express");
const router = express.Router();

const application = [
    {
        path : "/user",
        route : userRouter
    },  
]

application.forEach((paths)=>{
    router.use(paths.path,paths.route)
})

module.exports = router;