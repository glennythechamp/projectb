//import Workbook from "exceljs";
import { createReadStream, createWriteStream } from "fs";
import { parse } from "csv-parse";
//import {parseInt} from "Integer";

const logFinancialDS = () => {
    try {
        var rowArr = new Array();
        createReadStream("finDB.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                rowArr.push(row);
            })
            .on("end", function () {
                //console.log(rowArr[0]);
                return rowArr
            })
    } catch(err) {
        console.log(err)
    }
}





const getFinancialDSArr = async () => {
        return new Promise((res, err) => {
            var ds = [];
            createReadStream("finDB.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    ds.push(row);
                })
                .on("end", function () {
                    //console.log(ds[0]);
                    res(ds)
                })
                .on("error", (error) => {
                    err(console.log(error));
                })
        });
}

async function monthDiff(dateFrom, dateTo) {
     return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))

}



const calcCardPaymentsVal = async (ds) => {
    try {
        var dateTo = new Date()
        var amount = Array(12).fill(0)
        for (var i = 0; i < ds.length; i++) {
            var dateString = ds[i][23]
            var dateParts = dateString.split("/");
            // month is 0-based, that's why we need dataParts[1] - 1
            var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
            if (ds[i][9] == 'DEBIT_CREDIT_CARD_API' && ds[i][10] == 'Approved') {
                if (datediff < 12) {
                    amount[datediff] += Number(ds[i][17])
                }
            }
        }
        console.log(amount);
    } catch(err) {
        console.log(err)
    }
}





export { logFinancialDS, getFinancialDSArr, calcCardPaymentsVal }