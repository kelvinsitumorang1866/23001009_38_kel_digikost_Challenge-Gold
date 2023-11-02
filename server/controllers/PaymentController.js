const { json } = require("express");
const PaymentModel = require("../models/PaymentModel");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js");
const { index } = require("./RoomController");


class PaymentController {

    static async index (req,res){
        try {
            const Alldata = await PaymentModel.getAllPayment(knex);
           
            res.status(200).json(Alldata);
        } catch (error) {
            res.status(500).json(error);
            
        }


    }
    static async addPayment (req,res){
        try {
            let {User_id,Room_id,Amount} = req.body
            const currentDate = new Date();
            await PaymentModel.addPayment(knex,User_id,Room_id,Amount,currentDate);
            res.status(201).json('payment added succsesfuly');
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


}



module.exports = PaymentController;