const express = require("express");
const accountMiddleware = require("../Middleware/accountMiddleware");
const { accountModel } = require("../Database/mongoose");
const { default: mongoose } = require("mongoose");
const transferMiddleware = require("../Middleware/transferMiddleware");
const router = express.Router();

// This will return the balance of the users in the dashboard
router.post("/check-balance",accountMiddleware,async(req,res)=>{
    const userId = req.headers.userId;
    const decoded = await accountModel.findOne({
        userId
    })
    // pass the balance. Now need to check if exists or not as middleware do that already
    res.json({
        msg:"check balance",
        userBalance: decoded.balance
    })
})

// This will trigger the feature of transfering money from one person to another
router.post("/transfer-money",transferMiddleware,async(req,res)=>{
    // Session will be started
    const session =await mongoose.startSession();
    session.startTransaction();

    const {amt,to} = req.body;
    // fecth the acc within the transcation
    const account = await accountModel.findOne({
        userId : req.headers.userid
    }).session(session);
    // console.log(account)
    if(!account || account.balance < amt)
    {
        // abort the session and then return a response corresponding to that
        await session.abortTransaction();
        return res.json({
            msg:"Insufficent amount"
        })
    }
    // find the receiver account
    const toAccount = await accountModel.findOne({
        userId: to
    }).session(session);
    if(!toAccount)
    {
        await session.abortTransaction();
        return res.json({
            msg:"Invalid account"
        });
    }
    // Perform the transcation from one to another
    await accountModel.updateOne({
        userId : req.headers.userid
    },{
        $inc:{
            balance: -amt
        }
    }).session(session);


    await accountModel.updateOne({
        userId: to
    },{
        $inc:{
            balance: amt
        }
    }).session(session);
    // Terminate the session
    await session.commitTransaction();
    res.json({
        msg:"Transfer successfully..."
    });
})

module.exports = router;