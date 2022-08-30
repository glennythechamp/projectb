
import { s3Client, uploadParams, uploadObject, getFinancialDataset } from "./dataset_s3_fetch.mjs"
import Workbook from "exceljs";

var workbook = new Workbook.Workbook()
workbook.xlsx.readFile('index.xlsx')//Change file name here or give file path
.then(function() {
    uploadObject();
    var worksheet = workbook.getWorksheet('Sheet1');
    var i=1;
    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
      var r=worksheet.getRow(i).values;
      var r1=r[2];// Indexing a column
      console.log(r[2]);
      i++;
    }); 
    worksheet.getCell('B3').value = "abc";//Change the cell number here
return workbook.xlsx.writeFile('file.xlsx')//Change file name here or give     file path
   });


// Get Financial Dataset
getFinancialDataset();





// read and calculate number of approv. card payments
//var financial_ds_workbook = new Workbook.Workbook()
// financial_ds_workbook.xlsx.readFile('')




