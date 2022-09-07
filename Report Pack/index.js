
import { s3Client, /*uploadParams*/ /*uploadObject*/ getFinancialDataset, financial_ds_params, getFinancialDSArr, getReportPackTempl } from "./dataset_s3_fetch.mjs"
import { logFinancialDS, calcCardPaymentsVal, calcCardPayApprov, calcAvgSurcharRateMBM, calcDeclDirectDebits } from "./calculations.js"
import Workbook from "exceljs";
import * as dotenv from 'dotenv'

dotenv.config() 

// Declare Variables - To Be Used For Calculations
var financialDataset = [];
var cardPayVals = [];
var cardPayApproved = [];
var cardAvgSurch = [];
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



// Card Payments
// Test first entry of dataset
setTimeout(function() {console.log(financialDataset[0])}, 5000);

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
}, 4800)


// Please note seperate read/write
// Operations are being used for the excel file.
// These operations will be simplified into one operation
// on final product, to improve performance.




// Calculate Approved Card Payments Value
setTimeout(function() { 
  calcCardPaymentsVal(financialDataset).then(function(result) {
    cardPayVals = result
  })
}, 3000);

// Write Approved Card Payments Value
setTimeout(function() {
  cardPayVals.unshift("Value of Approved Payments") 
    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
      var sheet = workbook.getWorksheet('Sheet1');
      const row6 = sheet.getRow(8)
      row6.values = cardPayVals
      row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
  })
}, 5000)

// Calculate Approved Card Transactions
setTimeout(function() { 
  calcCardPayApprov(financialDataset).then(function(result) {
    cardPayApproved = result
  })
}, 3000);

// Write Approved Card Transactions
setTimeout(function() {
  cardPayApproved.unshift("Count of Approved Payments") 
    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
      var sheet = workbook.getWorksheet('Sheet1');
      const row6 = sheet.getRow(7)
      row6.values = cardPayApproved
      row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
  })
}, 5100)




// Average Surcharge rate % of Approved Card Payments – Month By Month
setTimeout(function() {
  calcAvgSurcharRateMBM(financialDataset).then(function(result) {
    cardAvgSurch = result;
  });
}, 3000);

setTimeout(function() {
  cardAvgSurch.unshift("Average Surcharge Rate") 
    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
      var sheet = workbook.getWorksheet('Sheet1');
      const row6 = sheet.getRow(9)
      row6.values = cardAvgSurch
      row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
  })
}, 5200)


// Direct Debits
// Number of Dishonored Direct Debits - Last 30 Day by Day
// NOTE: The dataset entries end on May, so current date
// will be set to May 2022 to reflect this.
setTimeout(function() {calcDeclDirectDebits(financialDataset)}, 3000);


