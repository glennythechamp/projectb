//import { s3Client, /*uploadParams*/ /*uploadObject*/ getFinancialDataset, financial_ds_params, getFinancialDSArr, getReportPackTempl, report_pack_templ_params } from "./dataset_s3_fetch.mjs"
//import { logFinancialDS, calcCardPaymentsVal, calcCardPayApprov, calcAvgSurcharRateMBM, calcDeclDirectDebits, calcApprovDDPayMBM, dishDirectDebitsCount, calcReminSent, calcDDPayApprov } from "./calculations.js"
const dsfetch = require('./dataset_s3_fetch.js')
const calcs = require('./calculations')
const express = require('express')
const ExcelJS = require('exceljs');
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
require('dotenv').config()





const reportGen = async () => {
  // Declare Variables - To Be Used For Calculations
  var financialDataset = [];
  var cardPayVals = [];
  var cardPayApproved = [];
  var cardAvgSurch = [];

  // Direct Debits
  var ddCount = []
  var ddPayVals = [];
  var declDDPayCount = [];
  var remindersSent = [];

  var workbook = new ExcelJS.Workbook()
  var dates = new Array(15)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var dStr = Date.now().toString()
  var fileName = process.env.REPORT_PACK_DATE + dStr + ".xlsx"

  // Fetch Dataset File
  await dsfetch.getFinancialDataset()
  // Fetch Report Pack Template File
  await dsfetch.getReportPackTempl(dStr)
  // Convert Fetched Dataset File .csv to array and assign it to the financialDataset variable
  setTimeout(function() {
    dsfetch.getFinancialDSArr().then(function(result) {
        financialDataset = result;
    });
  }, 2000)

  // Fill out dates for dataset
  setTimeout(function() {
    for (var i = 2; i < dates.length; i++) {
      var date = new Date();
      var point = i-2 
      date.setMonth(date.getMonth()-point);
      var dateStr = monthNames[date.getMonth()] + "-" + date.getFullYear()
      dates[i] = dateStr
    }

    workbook.xlsx.readFile(fileName).then(function () {
      var sheet = workbook.getWorksheet('Sheet1');
      const row5 = sheet.getRow(5)
      row5.values = dates
      row5.alignment = {horizontal: "center", vertical: "center"}
      row5.font = {size: 16, color: {argb: "ea862c"}}
      for (var i = 2; i < dates.length; i++) {
        if (dates[i]) {
          sheet.getColumn(i).width = 15
        }
      } 
      workbook.xlsx.writeFile(fileName) 
    });
  }, 2500)

  // Calculate Approved Card Payments Value
  setTimeout(function() { 
    calcs.calcCardPaymentsVal(financialDataset).then(function(result) {
      cardPayVals = result
    })
  }, 2500);


  // Calculate Approved Card Transactions
  setTimeout(function() { 
    calcs.calcCardPayApprov(financialDataset).then(function(result) {
      cardPayApproved = result
    })
  }, 2500);
  // Average Surcharge rate % of Approved Card Payments – Month By Month
  setTimeout(function() {
    calcs.calcAvgSurcharRateMBM(financialDataset).then(function(result) {
      cardAvgSurch = result;
    });
  }, 2500);
  // Direct Debits
  // Number of Dishonored Direct Debits - Last 30 Day by Day
  // NOTE: The dataset entries end on May, so current date
  // will be set to May 2022 to reflect this.
  // Calculate approved direct debit payments month by month
  setTimeout(function() {
    calcs.calcApprovDDPayMBM(financialDataset).then(function(result) {
      ddPayVals = result;
    });
  }, 2500);
  // Calculate number of dishonored direct debit payments month by month
  setTimeout(function() {
    calcs.dishDirectDebitsCount(financialDataset).then(function(result) {
      declDDPayCount = result;
    });
  }, 2500);
  // Calculate number of reminders sent
  setTimeout(function() {
    calcs.calcReminSent(financialDataset).then(function(result) {
      remindersSent = result;
    });

  }, 2500);
  setTimeout(function() {
    calcs.calcDDPayApprov(financialDataset).then(function(result) {
      ddCount = result;
    });
  }, 2500);


  // Write Calculations
  setTimeout(function() {
    try {
    cardPayVals.unshift("Value of Approved Payments")
    ddPayVals.unshift("Value of Approved Payments") 
    cardPayApproved.unshift("Count of Approved Payments")
    cardAvgSurch.unshift("Average Surcharge Rate")
    declDDPayCount.unshift("Dishonored Direct Debits")
    remindersSent.unshift("Reminders Sent")
    ddCount.unshift("Count of Approved Payments")     
      workbook.xlsx.readFile(fileName).then(function () {//Change file name here or give file path 
        var sheet = workbook.getWorksheet('Sheet1');      
        const row6 = sheet.getRow(8)
        row6.values = cardPayVals
        row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row7 = sheet.getRow(7)
        row7.values = cardPayApproved
        row7.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row9 = sheet.getRow(9)
        row9.values = cardAvgSurch
        row9.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row11 = sheet.getRow(11)
        row11.values = ddCount
        row11.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row12 = sheet.getRow(12)
        row12.values = ddPayVals
        row12.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row13 = sheet.getRow(13)
        row13.values = declDDPayCount
        row13.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        const row24 = sheet.getRow(24)
        row24.values = remindersSent
        row24.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
        workbook.xlsx.writeFile(fileName)//Change file name here or give     file path
    })
    } catch(err) {
      console.log(err)
    }  }, 3000)

    return fileName;
}


const app = express()



async function sendmail() {
  
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_CLIENT_USER, // generated ethereal user
      pass: process.env.EMAIL_CLIENT_PASS, // generated ethereal password
    },
  });

}


app.get("/download", async function (req, res, next) {
  const file = await reportGen();
  setTimeout(function() { 
    res.download('./' + file)
  }, 3300)
})


app.post("/email", jsonParser,async function (req, res, next) {
  const file = await reportGen()
  const email = req.body.email
  console.log(email)
  setTimeout(async function() { 
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_CLIENT_USER, // generated ethereal user
        pass: process.env.EMAIL_CLIENT_PASS, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: '"FeeSynergy" <vt123l@outlook.com>', // sender address
      to: email, // list of receivers
      subject: "RE: Generated Report Pack", // Subject line
      text: "Greetings, we've received your request to receive your report pack by mail. Please see the attachment above to the financial figures.", // plain text body
      html: "Greetings, we've received your request to receive your report pack by mail. Please see the attachment above to the financial figures.", // html body
      attachments: [
        {   // utf-8 string as an attachment
            path: './' + file
        },
      ]
    });


  }, 3300)
})






app.use('/', express.static('public'))

app.listen(3000, '0.0.0.0');








// Converted program to excelGen function to incorporate webserver middleware to run and serve excel file result

