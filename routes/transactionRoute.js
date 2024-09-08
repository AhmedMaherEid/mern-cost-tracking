const express = require('express')
const router = express.Router();
const Transaction = require('../models/Transaction');
const moment = require('moment');

router.post('/add-transaction', async function (req, res) {
    try {
        const newTransaction = new Transaction(req.body)
        await newTransaction.save();
        res.send("Transaction added Successfully")
    }
    catch (error) {
        res.status(500).json(error);
    }
})

router.post("/edit-transaction", async function (req, res) {
    try {
        await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
        res.send("Transaction Updated Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/delete-transaction", async function (req, res) {
    try {
        const test = await Transaction.findOneAndDelete({ _id: req.body.transactionId })
        if (test) {
            res.send("Transaction Deleted Successfully");
        }
        else {res.send("Something went wrong")}
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/get-all-transactions", async (req, res) => {
    const { frequency, selectedDateRange, type } = req.body;
    try {
        const transactions = await Transaction.find({
            userId: req.body.userId,
            ...(frequency !== "custom" ?
                { date: { $gt: moment().subtract(Number(req.body.frequency), 'd').toDate() } } :
                { date: { $gte: selectedDateRange[0], $lte: selectedDateRange[1] } }),
            ...(type !== 'all' && { type })
        })
        res.send(transactions)
    }
    catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;