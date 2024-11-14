const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user"); 
const accountRouter = require("./routes/account");

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);


app.listen(3000,()=>{
    console.log("Server run successfully...");
})