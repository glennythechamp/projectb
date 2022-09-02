
import { s3Client, uploadParams, uploadObject, getFinancialDataset, financial_ds_params } from "./dataset_s3_fetch.mjs"
import { logFinancialDS, calcCardPaymentsVal, getFinancialDSArr, calcCardPayApprov, calcAvgSurcharRateMBM } from "./calculations.js"
import Workbook from "exceljs";

var financialDataset = [];

// Assign result of CSV scan to the array created earlier
// TODO: Move getFinancialDSArr to dataset_s3_fetch module
getFinancialDSArr().then(function(result) {
    financialDataset = result;
});


// Card Payments
// Test first entry of dataset
setTimeout(function() {console.log(financialDataset[0])}, 5000);

// Calculate Approved Card Payments Value
setTimeout(function() {calcCardPaymentsVal(financialDataset)}, 3000);

// Calculate Approved Card Transactions
setTimeout(function() {calcCardPayApprov(financialDataset)}, 3000);

// Average Surcharge rate % of Approved Card Payments – Month By Month
setTimeout(function() {calcAvgSurcharRateMBM(financialDataset)}, 3000);


// Direct Debits
// Number of Dishonored Direct Debits - Last 30 Day by Day
// NOTE: The dataset entries end on May, so current date
// will be set to May 2022 to reflect this.











var workbook = new Workbook.Workbook()
workbook.xlsx.readFile('index.xlsx')//Change file name here or give file path
.then(function() {
    uploadObject();
    var worksheet = workbook.getWorksheet('Sheet1');
    var i=1;
    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
      var r=worksheet.getRow(i).values;
      var r1=r[2];// Indexing a column
      //console.log(r[2]);
      i++;
    });
    worksheet.getCell('B3').value = "abc";//Change the cell number here
return workbook.xlsx.writeFile('file.xlsx')//Change file name here or give     file path
   });


// Get Financial Dataset




// read and calculate number of approv. card payments
//var financial_ds_workbook = new Workbook.Workbook()
// financial_ds_workbook.xlsx.readFile('')




