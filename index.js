const express = require("express");
const mongoose = require("mongoose"); 
const { User } = require("./models/usermodel");
const { Product } = require("./models/productmodel");
const bodyParser = require("body-parser");
const Routers = require("./routers") 

let app = express();

let PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/datastore")
  .then(() => {
    console.log("connected to Mongo Dp");
  })
  .catch((e) => {
    console.log(e);
  });


//comment section


app.post("/product/create", async (req, res) => {
  let body = req.body;
  console.log(body);
  let productcreate = await Product.create(body);
  res.send(productcreate);
});

app.post("/user/create", async (req, res) => {
  let body = req.body;
  console.log(body);
  let uservalue = await User.create(body);
  res.send(uservalue);
});

app.get("/product/fetch", async (req, res) => {
  let values = await Product.find();
  res.send(values);
});

app.get("/product/findone", async (req, res) => {
  let params = req.query;
  console.log(params);
  let values = await Product.findOne();
  res.send(values);
});

app.get("/product/findreverse", async (req, res) => {
  let values = await Product.find().sort({ product_prize: -1 });
  res.send(values);
});

app.get("/product/findreverse/limit", async (req, res) => {
  let values = await Product.find().sort({ product_prize: -1 }).limit(3);
  res.send(values);
});

// passing one params in the url and fetching data
app.put("/update/user/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let body = req.body;
  console.log(body);
  let findUserById = await User.findById(id);
  console.log(findUserById);
  if (!findUserById) {
    res.status(400).send({ message: "user not found" });
  }
  findUserById = await User.findByIdAndUpdate({ _id: id }, body, { new: true });
  res.send(findUserById);
});

//passing two params in the url link
app.put("/user/update/:id/:contact", async (req, res) => {
  let id = req.params.id;
  let contact = req.params.contact;
  let body = req.body;
  console.log(body);
  let findData = await User.findOne({ _id: id, contact: contact });
  console.log(findData);
  if (!findData) {
    res.status(400).send({ message: "user is not find" });
  }
  findData = await User.findByIdAndUpdate({ _id: id, contact: contact }, body, {
    new: true,
  });
  res.send(findData);
});

//geting the id
app.put("/user/get/byemail/:email", async (req, res) => {
  let email = req.params.email;
  let body = req.body;
  console.log(body);
  let findUserByEmail = await User.findOne({ email: email });
  console.log(findUserByEmail);
  if (!findUserByEmail) {
    res.status(400).send({ message: "user id not found" });
  } else {
    findUserByEmail = await User.findByIdAndUpdate(
      { _id: findUserByEmail._id },
      body,
      { new: true }
    );
    res.send(findUserByEmail);
  }
});

//delete api
app.delete("/user/delete/byid/:id", async (req, res) => {
  let id = req.params.id;
  let findUserById = await User.findById(id);
  console.log(findUserById);
  if (!findUserById) {
    res.status(400).send({ message: "user not found" });
  } else {
    findUserById = await User.findByIdAndDelete(id);
    res.send({ message: "user is deleted...." });
  }
});


//comment section

app.get("/dummy", (req, res) => {
  res.send({ message: "node app is working........" });
});


app.use(express.static('public'))
//routes
app.use(Routers);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
