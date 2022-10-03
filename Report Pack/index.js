import { s3Client, /*uploadParams*/ /*uploadObject*/ getFinancialDataset, financial_ds_params, getFinancialDSArr, getReportPackTempl } from "./dataset_s3_fetch.mjs"
import { logFinancialDS, calcCardPaymentsVal, calcCardPayApprov, calcAvgSurcharRateMBM, calcDeclDirectDebits, calcApprovDDPayMBM, dishDirectDebitsCount, calcReminSent, calcDDPayApprov } from "./calculations.js"
import Workbook from "exceljs";
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config() 

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

  var workbook = new Workbook.Workbook()
  var dates = new Array(15)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Fetch Dataset File
  await getFinancialDataset()
  // Fetch Report Pack Template File
  await getReportPackTempl()
  // Convert Fetched Dataset File .csv to array and assign it to the financialDataset variable
  setTimeout(function() {
    getFinancialDSArr().then(function(result) {
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

    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {
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
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE) 
    });
  }, 3000)

  // Calculate Approved Card Payments Value
  setTimeout(function() { 
    calcCardPaymentsVal(financialDataset).then(function(result) {
      cardPayVals = result
    })
  }, 3000);


  // Calculate Approved Card Transactions
  setTimeout(function() { 
    calcCardPayApprov(financialDataset).then(function(result) {
      cardPayApproved = result
    })
  }, 3000);
  // Average Surcharge rate % of Approved Card Payments – Month By Month
  setTimeout(function() {
    calcAvgSurcharRateMBM(financialDataset).then(function(result) {
      cardAvgSurch = result;
    });
  }, 3000);
  // Direct Debits
  // Number of Dishonored Direct Debits - Last 30 Day by Day
  // NOTE: The dataset entries end on May, so current date
  // will be set to May 2022 to reflect this.
  // Calculate approved direct debit payments month by month
  setTimeout(function() {
    calcApprovDDPayMBM(financialDataset).then(function(result) {
      ddPayVals = result;
    });
  }, 3000);
  // Calculate number of dishonored direct debit payments month by month
  setTimeout(function() {
    dishDirectDebitsCount(financialDataset).then(function(result) {
      declDDPayCount = result;
    });
  }, 3000);
  // Calculate number of reminders sent
  setTimeout(function() {
    calcReminSent(financialDataset).then(function(result) {
      remindersSent = result;
    });

  }, 3000);
  setTimeout(function() {
    calcDDPayApprov(financialDataset).then(function(result) {
      ddCount = result;
    });
  }, 3000);


  // Write Calculations
  setTimeout(function() {
    cardPayVals.unshift("Value of Approved Payments")
    ddPayVals.unshift("Value of Approved Payments") 
    cardPayApproved.unshift("Count of Approved Payments")
    cardAvgSurch.unshift("Average Surcharge Rate")
    declDDPayCount.unshift("Dishonored Direct Debits")
    remindersSent.unshift("Reminders Sent")
    ddCount.unshift("Count of Approved Payments")     
      workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
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
        workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
    })
  }, 5000)
}



// Converted program to excelGen function to incorporate webserver middleware to run and serve excel file result
reportGen();