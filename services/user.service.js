const { User } = require("../models/usermodel");
const Bcrypt = require("bcryptjs");

//bcrypt password encryption
const Registration = async (req) => {
  let body = req.body;
  console.log(body, "body");
  const { password } = body;
  console.log(password, "-- password");
  const salt = await Bcrypt.genSalt(10);
  const hash = await Bcrypt.hash(password, salt);
  console.log(hash, "--hash");
  const datas = { ...body, ...{ password: hash } };
  const creation = await User.create(datas);
  return creation;
};

//login
const login = async (req) => {
  let body = req.body;
  const { password, email } = body;
  let findByEmail = await User.findOne({ email: email });
  console.log(findByEmail);
  if (!findByEmail) {
    return null;
  } else {
    let comp = await Bcrypt.compare(password, findByEmail.password);
    if (comp) {
      let details = {
        name: findByEmail.name,
        email: findByEmail.email,
        _id: findByEmail._id,
      };
      console.log("detail");
      console.log(`details is ${details.name}`);
      return details;
    } else {
      return null;
    }
  }
};


//verification
const getUserProfile = async (req)=>{
  let userId = req.userId
  let findUser = await User.findById(userId)
  if(!findUser){
    return null
  }else{
    return findUser
  }
}

//find
const Find = async (req) => {
  let id = req.params.id;
  const findUserById = await User.findById(id);
  if (!findUserById) {
    return null;
  } else {
    return findUserById;
  }
};

//finding ID using query
const findQuery = async (req) => {
  let params = req.query;
  console.log(params);
  const findQueryId = await User.findOne();
  console.log(findQueryId);
  if (!findQueryId) {
    return null;
  } else {
    return findQueryId;
  }
};

//finding name using query
const finduserName = async (req) => {
  const name = req.query;
  console.log(name);
  const findByName = await User.findOne(name);
  console.log(findByName);
  if (!findByName) {
    return null;
  } else {
    return findByName;
  }
};

//finding ID by url mapping 
const findUrlId = async (req) => {
  const id = req.params.id;
  console.log(id);
  const findById = await User.findOne({ _id: id });
  console.log(findById);
  if (!findById) {
    return null;
  } else {
    return findById;
  }
};

//finding and updating ID by url mapping
const updateUrlId = async (req) => {
  const id = req.params.id;
  console.log(id);
  const body = req.body;
  console.log(body);
  const updateById = await User.findOne({ _id: id });
  console.log(updateById);
  if (!updateById) {
    return null;
  } else {
    // updateById = await User.findByIdAndUpdate({_id:id},body,{new:true})
    return updateById;
  }
};

const profile = async (req) => {
  if (req.file) {
    let id = req.params.id;
    let file = req.file;
    let findUser = await User.findById(id);
    if (!findUser) {
      return null;
    } else {
      let path = "/user/" + req.file.filename;
      findUser = await User.findByIdAndUpdate(
        { _id: id },
        { profile: path },
        { new: true }
      );
      return findUser;
    }
  }
};

module.exports = {
  Registration,
  login,
  profile,
  getUserProfile,
  Find,
  findQuery,
  finduserName,
  findUrlId,
  updateUrlId,
};
