const JWT = require("jsonwebtoken");

const getAuthToken = async (data) => {
  const { _id } = data;
  let token = JWT.sign({ id: _id }, "KAUSHIK");
  console.log("token is -->", token);
  return token;
};

//verification
const verification = async (req, res, next) => {
  let bearer = req.headers.authorization;
  let splitting = bearer.split(" ");
  let token = splitting[1];
  console.log(token);
  if (!token) {
    res.status(401).send({ message: "User must Logged in" });
  } else {
    try {
      let payload = JWT.verify(token, "KAUSHIK");
      let userId = payload.id;
      let findByUserId = await User.findById(userId);
      if(!findByUserId){
        res.status(401).send({message : "user Invalid"})
      }else{
        req.userId = userId;
        next();
      }
    } catch {
        res.status(401).send({message : "user invalid"})
    }
  }
};

module.exports = {
  getAuthToken,
  verification
};
