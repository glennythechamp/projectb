//import Workbook from "exceljs";
var fs = require('fs'); 
//import {parseInt} from "Integer";


module.exports = {

    logFinancialDS: function () {
        try {
            var rowArr = new Array();
            fs.createReadStream("finDB.csv")
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
    },




    // Calculate Card Payments Value - Month by Month
    calcCardPaymentsVal: async function (ds) {
        return new Promise((res, err) => {
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
                res(amount);
                
            } catch(error) {
                err(error)
            }
        });
    },


    // Calculate number of approved card payments, month by month
    calcCardPayApprov: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var approved = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][9] == 'DEBIT_CREDIT_CARD_API' && ds[i][10] == 'Approved') {
                        if (datediff < 13) {
                            
                            approved[datediff]++
                        }
                    }
                }
                res(approved)
            } catch(error) {
                err(error)
            }
        });
    },

    // Calculate average surcharge rate of card payments, month by month
    calcAvgSurcharRateMBM: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var avgsurchargembmsum = Array(13).fill(0)
                var avgsurchargembmcount = Array(13).fill(0)
                var avgsurcharge = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][9] == 'DEBIT_CREDIT_CARD_API' && ds[i][10] == 'Approved') {
                        if (datediff < 13) {
                            avgsurchargembmsum[datediff] += Number(ds[i][14])
                            avgsurchargembmcount[datediff]++
                            avgsurcharge[datediff] = avgsurchargembmsum[datediff]/avgsurchargembmcount[datediff]
                        }
                    }
                }
                res(avgsurcharge)
            } catch(error) {
                err(error)
            }
        });
    },

    // Direct Debits



    // Calculate Approved Direct Debit Payments Month by Month
    calcApprovDDPayMBM: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var directDebitPaymentsVal = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][9] == 'BRANCH_PAYMENT' && ds[i][10] == 'Approved') {
                        if (datediff < 13) {
                            directDebitPaymentsVal[datediff] += Number(ds[i][17]);
                        }
                    }
                }
                res(directDebitPaymentsVal)
            } catch (error) {
                err(error)
            }
        });
    },

    dishDirectDebitsCount: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var dishDDCount = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][9] == 'BRANCH_PAYMENT' && ds[i][10] == 'Declined') {
                        if (datediff < 13) {
                            dishDDCount[datediff]++
                        }
                    }
                }
                res(dishDDCount)
            } catch (error) {
                err(error)
            }
        });
    },




    // Declined Direct Debits Day by Day
    calcDeclDirectDebits: async function (ds) {
        try {
            var dateTo = new Date()
            // Month will be set to May 2022, since the entries for dataset
            // ends on the month of May.
            dateTo.setMonth(4)
            var dishonoredDirectDebits = Array(31).fill(0)
            for (var i = 0; i < ds.length; i++) {
                var dateString = ds[i][23]
                var dateParts = dateString.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                const oneDay = 24 * 60 * 60 * 1000;
                var daysdiff = Math.round((dateTo - dateFrom) / oneDay);
                if (ds[i][9] == 'BRANCH_PAYMENT' && ds[i][10] == 'Declined') {
                    console.log(daysdiff)
                    if (daysdiff < 31 && daysdiff >= 0) {
                        dishonoredDirectDebits[Math.abs(daysdiff)]++
                    }
                }
            }
            console.log("Dis Honored" + dishonoredDirectDebits);
        } catch(err) {
            console.log(err)
        }
    },



    // Calculate Reminders Sent MBM
    calcReminSent: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var remindersSent = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][19] == 'Yes') {
                        if (datediff < 13) {
                            remindersSent[datediff]++
                        }
                    }
                }
                res(remindersSent)
            } catch(error) {
                err(error)
            }
        });
    },



    // Calculate number of approved card payments, month by month
    calcDDPayApprov: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var approved = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][9] == 'BRANCH_PAYMENT' && ds[i][10] == 'Approved') {
                        if (datediff < 13) {
                            approved[datediff]++
                        }
                    }
                }
                res(approved)
            } catch(error) {
                err(error)
            }
        });
    },
    calcDroppedCrSc: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var dropped = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][22] == 'Decreased') {
                        if (datediff < 13) {
                            dropped[datediff]++
                        }
                    }
                }
                res(dropped)
            } catch(error) {
                err(error)
            }
        });
    },
    crScDTr: async function (ds) {
        return new Promise((res, err) => {
            try {
                var dateTo = new Date()
                var Fair = Array(13).fill(0)
                var Good = Array(13).fill(0)
                var Poor = Array(13).fill(0)
                var ND = Array(13).fill(0)
                for (var i = 0; i < ds.length; i++) {
                    var dateString = ds[i][23]
                    var dateParts = dateString.split("/");
                    // month is 0-based, that's why we need dataParts[1] - 1
                    var dateFrom = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var datediff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
                    if (ds[i][21] == 'Poor') {
                        if (datediff < 13) {
                            Poor[datediff]++
                        }
                    }
                    if (ds[i][21] == 'Good') {
                        if (datediff < 13) {
                            Good[datediff]++
                        }
                    }
                    if (ds[i][21] == 'Fair') {
                        if (datediff < 13) {
                            Fair[datediff]++
                        }
                    }
                    if (ds[i][21] == 'No Data') {
                        if (datediff < 13) {
                            ND[datediff]++
                        }
                    }
                }
                var dt = [Good, Fair, Poor, ND]
                res(dt)
            } catch(error) {
                err(error)
            }
        });
    }
}

/*export { logFinancialDS, calcCardPaymentsVal,
         calcCardPayApprov, calcAvgSurcharRateMBM, calcDeclDirectDebits, calcApprovDDPayMBM, dishDirectDebitsCount, calcReminSent, calcDDPayApprov  }
*/