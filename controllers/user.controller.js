const userService = require("../services/user.service");
const { getAuthToken } = require("../middleware/jwt.config");

const UserRegistration = async (req, res) => {
  const userReg = await userService.Registration(req);
  if (!userReg) {
    res.status(400).send({ message: "user reg is failed" });
  } else {
    res.status(201).send(userReg);
  }
  //   try{
  //     const userReg = await userService.Registration(req);
  //     res.status(201).send(userReg);
  //   }catch{
  //     res.status(400).send({message:"user reg is failed"});
  //   }
};

//login
const logincontrol = async (req, res) => {
  const logindetail = await userService.login(req);
  // console.log("login", logindetail);
  if (logindetail == null) {
    res.status(401).send({ message: "user reg is failed" });
  } else {
    let tokens = await getAuthToken(logindetail);
    res.status(201).send({ data: logindetail, token: tokens });
  }
};

//verification
const getUserProfile = async (req, res) => {
  const data = await userService.getUserProfile(req);
  try {
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "user not available" });
  }
};

const findUserById = async (req, res) => {
  try {
    const findUserById = await userService.Find(req);
    res.status(200).send(findUserById);
  } catch {
    res.status(400).send({ message: "User not found" });
  }
};

const findByQuery = async (req, res) => {
  const findQueryById = await userService.findQuery(req);
  if (findQueryById == null) {
    res.status(401).send({ message: "User is not found" });
  } else {
    res.status(201).send(findQueryById);
    // console.log(findQueryById);
  }
};

const findByName = async (req, res) => {
  const findUserName = await userService.finduserName(req);
  if (findUserName == null) {
    res.status(401).send({ message: "User is not found" });
  } else {
    res.status(201).send(findUserName);
    // console.log(findQueryById);
  }
};


// const findIdUrl = async (req,res)=>{
//   try{
//     const findUserId = await userService.
//   }catch{

//   }
// }

//file upload
const fileupload = async (req,res)=>{
  let upload = await userService.profile(req)
  if(upload){
    res.status(200).send({upload});
  }else{
    res.status(400).send({message:"file not found"})
  }
}



module.exports = {
  UserRegistration,
  logincontrol,
  fileupload,
  getUserProfile,
  findUserById,
  findByQuery,
  findByName,
};
