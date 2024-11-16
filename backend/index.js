const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user"); 
const accountRouter = require("./routes/account");

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Add your frontend URL(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true, // This allows cookies/authentication
    maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);


app.listen(3000,()=>{
    console.log("Server run successfully...");
})