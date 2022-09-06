
import { s3Client, /*uploadParams*/ /*uploadObject*/ getFinancialDataset, financial_ds_params, getFinancialDSArr, getReportPackTempl } from "./dataset_s3_fetch.mjs"
import { logFinancialDS, calcCardPaymentsVal, calcCardPayApprov, calcAvgSurcharRateMBM, calcDeclDirectDebits } from "./calculations.js"
import Workbook from "exceljs";
import * as dotenv from 'dotenv'

dotenv.config() 

// Declare Variables - To Be Used For Calculations
var financialDataset = [];
var cardPayVals = [];
var cardPayApproved = [];


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
  


})





// Calculate Approved Card Payments Value
setTimeout(function() { 
  calcCardPaymentsVal(financialDataset).then(function(result) {
    cardPayVals = result
  })
}, 3000);

// Write Approved Card Payments Value
setTimeout(function() {
  cardPayVals.unshift("Value of Approved Payments") 
  var workbook = new Workbook.Workbook()
    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
      var sheet = workbook.getWorksheet('Sheet1');
      const row6 = sheet.getRow(7)
      row6.values = cardPayVals
      row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
  })
}, 4500)

// Calculate Approved Card Transactions
setTimeout(function() { 
  calcCardPayApprov(financialDataset).then(function(result) {
    cardPayApproved = result
  })
}, 3000);

// Write Approved Card Transactions
setTimeout(function() {
  cardPayApproved.unshift("Count of Approved Payments") 
  var workbook = new Workbook.Workbook()
    workbook.xlsx.readFile(process.env.REPORT_PACK_TEMPLATE).then(function () {//Change file name here or give file path 
      var sheet = workbook.getWorksheet('Sheet1');
      const row6 = sheet.getRow(6)
      row6.values = cardPayApproved
      row6.getCell('A').font = {color: {argb: "4372c5"}, size: 14}
      workbook.xlsx.writeFile(process.env.REPORT_PACK_TEMPLATE)//Change file name here or give     file path
  })
}, 5000)




// Average Surcharge rate % of Approved Card Payments – Month By Month
setTimeout(function() {calcAvgSurcharRateMBM(financialDataset)}, 3000);


// Direct Debits
// Number of Dishonored Direct Debits - Last 30 Day by Day
// NOTE: The dataset entries end on May, so current date
// will be set to May 2022 to reflect this.
setTimeout(function() {calcDeclDirectDebits(financialDataset)}, 3000);


