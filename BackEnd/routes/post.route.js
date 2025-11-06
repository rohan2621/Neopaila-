import express from 'express'
const router = express.Router("/", (req, res => {
    res.status(200).send("Hello postman")
}));

export default router