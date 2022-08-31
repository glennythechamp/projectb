//import Workbook from "exceljs";
import { createReadStream, createWriteStream } from "fs";
import { parse } from "csv-parse";

const logFinancialDS = async () => {
    try {
        var rowArr = [];
        createReadStream("finDB.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                rowArr.push(row);
                console.log(row);
            })
            .on("end", function () {
                console.log(rowArr);
            })
    } catch(err) {
        console.log(err)
    }
}


export { logFinancialDS }