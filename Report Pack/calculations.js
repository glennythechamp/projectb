//import Workbook from "exceljs";
import { createReadStream, createWriteStream } from "fs";
import { parse } from "csv-parse";

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



const calcCardPaymentsVal = async (ds) => {
    try {
        for (var i = 0; i < 20; i++) {
            console.log(ds[i][0])
        }
    } catch(err) {
        console.log(err)
    }
}





export { logFinancialDS, getFinancialDSArr, calcCardPaymentsVal }
