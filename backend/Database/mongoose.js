const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://kashyap12345:kashyap123456789@cluster0.mwsas.mongodb.net/digital-wallet")
  .then(() => {
    console.log("Mongodb connect successfully...");
  })
  .catch((err) => console.log("Something goes wrong with Mongodb..."));

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = {
    userModel
};
