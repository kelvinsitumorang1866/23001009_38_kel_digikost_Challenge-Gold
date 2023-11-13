const { json } = require("express");
const PaymentModel = require("../models/PaymentModel");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js");
const { index } = require("./RoomController");
const userModel = require("../models/UserModel.js");


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
            const paymetData = await PaymentModel.addPayment(knex,User_id,Room_id,Amount,currentDate);
                if(paymetData){
                    let currentDate =new Date();
                    currentDate.setDate(currentDate.getDate() + 30);
                    await userModel.addDeadline(knex,User_id,currentDate);
                    res.status(201).json('payment added succsesfuly');
                }else{
                    res.status(500).json("payment failed");

                }
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


}



module.exports = PaymentController;