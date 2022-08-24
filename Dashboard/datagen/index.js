import { faker } from '@faker-js/faker';
import dotenv from 'dotenv/config';
import { createConnection } from 'mysql';
import fs from 'fs'


const connection = createConnection({ 
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

//function getMonthDifference(startDate, endDate) {
//  return (
//    endDate.getMonth() -
//    startDate.getMonth() +
//    12 * (endDate.getFullYear() - startDate.getFullYear())
//  );
//}

connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});

// Generate rows for customer table
// for (var i = 0; i < 30; i++) {
//     const customer = {id: i, name: faker.name.findName(), address: faker.address.streetAddress(true),  phone_no: `${9}${5}${Math.floor((Math.random() * 999999)+100000)}` };
//     connection.query('INSERT INTO customers SET ?', customer, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.insertId);
//     });
// }
// End Row Generate

// Generate rows for transactions
// for (var i = 0; i < 50; i++) {
//     var tdateyear = "2021"
//     var tdatemonth = Math.floor((Math.random() * 12)+1).toString()
//     var tdateday = Math.floor((Math.random() * 30)+1).toString()
//     if (tdatemonth == 2 && tdateday > 28) {
//       tdateday = "13"
//     }
//     var t_date = tdateyear + "-" + tdatemonth + "-" + tdateday
//     const transactions = {id: i, cust_id: Math.floor((Math.random() * 29) + 0), t_description: "", amount: Math.floor((Math.random() * 1999) + 0), t_date: t_date, approved: true};
//     connection.query('INSERT INTO transactions SET ?', transactions, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.insertId);
//     });
// }
// End Row Generate



// // Generate rows for card_payments
// for (var i = 10; i < 50; i++) {
//   const sql = "INSERT INTO card_payments SET ?";
//   const card_payments = { id: i, trans_id: i, surcharge: Number((Math.random() * (7.99 - 0.5) + 0.5).toFixed(2))}
//   connection.query(sql, card_payments, function(err, res) {
//     if (err) throw err;
//     console.log('Last insert ID:', res.insertId);
//   });
// }
// End Row Generate

// Test set 1: See if UI Updates to include new month
// var t_date = "2022" + "-" + "02" + "-" + "05"
//     const transactions1 = {id: 51, cust_id: Math.floor((Math.random() * 29) + 0), t_description: "", amount: Math.floor((Math.random() * 36000) + 24000), t_date: t_date, approved: true};
//     connection.query('INSERT INTO transactions SET ?', transactions1, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.insertId);
//     });
// const sql = "INSERT INTO card_payments SET ?";
// const card_payments1 = { id: 51, trans_id: 51, surcharge: Number((Math.random() * (7.99 - 0.5) + 0.5).toFixed(2))}
// connection.query(sql, card_payments1, function(err, res) {
//   if (err) throw err;
//   console.log('Last insert ID:', res.insertId);
// });
// End Test set 1

// Test set 2: See if UI Updates to include new month
// var t_date = "2022" + "-" + "02" + "-" + "05"
//     const transactions2 = {id: 52, cust_id: Math.floor((Math.random() * 29) + 0), t_description: "", amount: Math.floor((Math.random() * 36000) + 24000), t_date: t_date, approved: true};
//     connection.query('INSERT INTO transactions SET ?', transactions2, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.insertId);
//     });
// const sql = "INSERT INTO card_payments SET ?";
// const card_payments2 = { id: 52, trans_id: 52, surcharge: Number((Math.random() * (7.99 - 0.5) + 0.5).toFixed(2))}
// connection.query(sql, card_payments2, function(err, res) {
//   if (err) throw err;
//   console.log('Last insert ID:', res.insertId);
// });
// End Test set 2


// Insert rows for direct_debit_agreements 
// for (var i = 4; i < 10; i++) {
//    var tdate1, tdate2
//    var tdateyear = "2021"
//    var tdatemonth = Math.floor((Math.random() * 12)+1).toString()
//    var tdateday = Math.floor((Math.random() * 30)+1).toString()
//    if (tdatemonth == 2 && tdateday > 28) {
//      tdateday = "15"
//      }
//    tdate1 = tdateyear + "-" + tdatemonth + "-" + tdateday

//    tdateyear = "2022"
//    tdatemonth = Math.floor((Math.random() * 6)+1).toString()
//    tdateday = Math.floor((Math.random() * 30)+1).toString()
//    if (tdatemonth == 2 && tdateday > 28) {
//      tdateday = "15"
//      }
//    tdate2 = tdateyear + "-" + tdatemonth + "-" + tdateday
   
//     var banks = [
//       {bank_name: "Westpac", bsb: `${0}${3}${2}` + "-" + `${Math.floor((Math.random() * 999)+100)}`, account_number: Math.floor((Math.random() * 999999999)+100000000)},
//       {bank_name: "ANZ", bsb: `${0}${1}${2}` + "-" + `${Math.floor((Math.random() * 999)+100)}`, account_number: Math.floor((Math.random() * 999999999)+100000000)},
//       {bank_name: "CBA", bsb: `${0}${6}${2}` + "-" + `${Math.floor((Math.random() * 999)+100)}`, account_number: Math.floor((Math.random() * 999999999)+100000000)},
//       {bank_name: "NAB", bsb: `${0}${8}${2}` + "-" + `${Math.floor((Math.random() * 999)+100)}`, account_number: Math.floor((Math.random() * 999999999)+100000000)}
//     ]; 

//     const ref = Math.floor((Math.random() * 4)+0)
  

//     const direct_debit_agreements = {id: i, account_name: faker.company.companyName(), cust_id: Math.floor((Math.random() * 29) + 0), start_date: tdate1, end_date: tdate2 , dd_amount: Math.floor((Math.random() * 5000) + 0), frequency: "monthly", bank_name: banks[ref].bank_name, account_number: banks[ref].account_number, bsb: banks[ref].bsb};
//     connection.query('INSERT INTO direct_debit_agreement SET ?', direct_debit_agreements, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.insertId);
//     });
// }
// End Row Generate

// Insert Rows For Active Direct Debit Payments
// This code will execute as a serverless function on any cloud platform, the execuation time is scheduled for each month on the 30th (28th for Feb),
// It will go through the direct debit agreements and count the number of active direct debit authorities for that date, for the past 12 months from the execuation date.
// 
// var dir_debits = [];

// connection.query("SELECT * FROM direct_debit_agreement", function (err, result, fields) {
//   if (err) throw err;
//   for (var i = 0; i < result.length; i++) {
//     dir_debits.push(result[i])
//     console.log("pushed" + i + "dd")
//   }
// });

// const d = new Date();
// var calc_start_month = d.getMonth();
// var calc_start_year = d.getFullYear()-1;
// var active = [];
// var agg_date, agg_month, agg_year;


// setTimeout(() => {
// for (var i = 0; i < 13; i++) {
//   if (calc_start_month == 2) {
//     var mthyr_ptr = new Date(Date.parse(calc_start_year.toString() + "-" + calc_start_month.toString() + "-" + "28"))
//   } else {
//     var mthyr_ptr = new Date(Date.parse(calc_start_year.toString() + "-" + calc_start_month.toString() + "-" + "30"))
//   }
//   var active_par = 0 
//   for (var j = 0; j < dir_debits.length; j++) {
//     console.log("in loop detect")
//     if (Date.parse(dir_debits[j].start_date) < mthyr_ptr &&  Date.parse(dir_debits[j].end_date) > mthyr_ptr) {
//       console.log("detect")
//       active_par++
//     }
//   }
//   if (calc_start_month == 12 ) {
//     calc_start_month = 1;
//     calc_start_year++;
//   } else {
//     calc_start_month++;
//   }
  
//   agg_date = mthyr_ptr.getDate();
//   agg_month = mthyr_ptr.getMonth()+1;
//   agg_year = mthyr_ptr.getFullYear();

//   const act_dd_date = agg_year.toString() + "-" + agg_month.toString() + "-" + agg_date.toString() 
//   const row = {
//     active_dird_date: act_dd_date,
//     count: active_par
//   }
//   active.push(row)
//   console.log(active)
// }
// }, 5000);

// setTimeout(() => {
//   // Delete current entries from table to prepare new table for past 12 months
//   var sql = "DELETE FROM active_direct_debit_auth";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });

//   // Insert entries from date of calculation
//   for (var i = 0; i < active.length; i++) {
//     var date = active[i].active_dird_date
//     var count = active[i].count
//     const active_direct_debit_auth = {id: i, count_date: date, active_dd: count};
//     connection.query('INSERT INTO active_direct_debit_auth SET ?', active_direct_debit_auth, (err, res) => {
//     if(err) throw err;
//     console.log('Last insert ID:', res.insertId);
//     });
//   }
// }, 10000);


// Insert Rows For Direct Debits into Transactions table
// var counter = 53;
// function insertDD(day, month, year, result) {
//   var t_date = year + "-" + month + "-" + day
//   const transactions = {id: counter, cust_id: result.cust_id, t_description: "Direct Debit Payment", amount: result.dd_amount, t_date: t_date, approved: true};
//   connection.query('INSERT INTO transactions SET ?', transactions, (err, res) => {
//     if(err) throw err;
//     console.log('Last insert ID:', res.insertId);
//   });
//   counter++;
// }
// connection.query("SELECT * FROM direct_debit_agreement", function (err, result, fields) {
//   if (err) throw err;
//   for (var i = 0; i < result.length; i++) {
//     var start = new Date(Date.parse(result[i].start_date));
//     var end = new Date(Date.parse(result[i].end_date));
//     const months = getMonthDifference(start, end);
//     for (var j = 0; j < months; j++) {
//       var day, month, year
//       if ((start.getMonth()+1)+j > 12) {
//         day = start.getDay();
//         month = (start.getMonth()+1)+j - 12;
//         year = "2022"
//       } else {
//         day = start.getDay();
//         month = (start.getMonth()+1)+j
//         year = "2021"
//       }
//       insertDD(day, month, year, result[i])
//     }
//   }
// });
// End Insert Rows For Direct Debits into Transactions table


// Insert DD Transactions into direct_debits
// var tid = [];
// connection.query("SELECT * FROM transactions WHERE t_description=\"Direct Debit Payment\"", function (err, result, fields) {
//   if (err) throw err;
//   for (var i = 0; i < result.length; i++) {
//     tid.push(result[i])
//     console.log("pushed" + i + "tid")
//   }
// });
// console.log(tid);
// var ddid = [];
// connection.query("SELECT * FROM direct_debit_agreement", function (err, result, fields) {
//   if (err) throw err;
//   for (var i = 0; i < result.length; i++) {
//     ddid.push(result[i])
//     console.log("pushed" + i + "ddid")
//   }
// });
// setTimeout(() => {
//   for (var i = 0; i < tid.length; i++) {
//     console.log(tid)
//     for (var j = 0; j < ddid.length; j++) {
//       if (tid[i].cust_id == ddid[j].cust_id && tid[i].amount == ddid[j].dd_amount) {
//         const direct_debits = {id: i, trans_id: tid[i].id, dd_agreement_id: ddid[j].id, };
//         connection.query('INSERT INTO direct_debits SET ?', direct_debits, (err, res) => {
//           if(err) throw err;
//           console.log('Last insert ID:', res.insertId);
//         });
//       }
//     }
//   }
// },5000)
// End Insert DD Transactions into direct_debits

//Insert rows for finance_quote
// for (var i = 0; i < 30; i++) {
//     var tdateyear = "2021"
//     var tdatemonth = Math.floor((Math.random() * 12)+1).toString()
//     var tdateday = Math.floor((Math.random() * 30)+1).toString()
//     if (tdatemonth == 2 && tdateday > 28) {
//      tdateday = "15"
//     }
//     var quote_date = tdateyear + "-" + tdatemonth + "-" + tdateday
//     var approv = Math.round(Math.random());
//     var approved;
//     if (approv == 1) {
//       approved = true; 
//     } else {
//       approved = false;
//     } 
//     const finance_quote = { id: i, cust_id: Math.floor((Math.random() * 29) + 0), quote_date: quote_date,  amount: Math.floor((Math.random() * 25000) + 5000), approved: approved} 
//     connection.query('INSERT INTO finance_quote SET ?', finance_quote, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.id);
//     });
// }

// // Get approved finance_quotes
// var approved_quotes = [];
// connection.query("SELECT * FROM finance_quote WHERE approved=1", function (err, result, fields) {
//   if (err) throw err;
//   for (var i = 0; i < result.length; i++) {
//     approved_quotes.push(result[i])
//     console.log("pushed" + i + "quote")
//   }
// });
// // Insert rows for finance_agreement
// setTimeout(() => {
// for (var i = 0; i < approved_quotes.length; i++) { 
//   const finance_agreement = {id: i, quote_id: approved_quotes[i].id, agreement_date: approved_quotes[i].quote_date, interest_rate: Number((Math.random() * (7.99 - 0.5) + 0.5).toFixed(2)), credit_limit: approved_quotes[i].amount, credit_utilzed: Number((Math.random() * (approved_quotes[i].amount - 0) + 0).toFixed(2)), active: true}
//   connection.query('INSERT INTO finance_agreement SET ?', finance_agreement, (err, res) => {
//     if(err) throw err;
//     console.log('Last insert ID:', res.id);
//   });
// }
// },5000)


// // Insert rows for Engagements
// for (var i = 0; i < 30; i++) { 
//   var tdate1, tdate2
//   var tdateyear
//   if (i < 15) {
//     tdateyear = "2021"
//   } else {
//     tdateyear = "2022"
//   }
//   var tdatemonth = Math.floor((Math.random() * 12)+1)
//   var tdateday = Math.floor((Math.random() * 30)+1)
//   if (tdatemonth == 2 && tdateday > 28) {
//     tdateday = "15"
//   }
//   tdate1 = tdateyear + "-" + tdatemonth.toString() + "-" + tdateday.toString()
//   var signed = Math.round(Math.random());
//   if (signed == 1) {
//     if (tdateday >= 16 && tdatemonth < 12) {
//       tdate2 = tdateyear + "-" + (tdatemonth+1).toString() + "-" + tdateday.toString()
//     } else if (tdateday < 16) {
//       tdate2 = tdateyear + "-" + tdatemonth.toString() + "-" + (tdateday+14).toString()
//     } else {
//       tdate2 = tdate1;
//     }
//     const engagement = {id: i, cust_id:  Math.floor((Math.random() * 29) + 0), sent_date: tdate1, signed_date: tdate2, sent: true, signed: true}
//     connection.query('INSERT INTO engagements SET ?', engagement, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.id);
//     });
//   } else {
//     const engagement = {id: i, cust_id:  Math.floor((Math.random() * 29) + 0), sent_date: tdate1, sent: true, signed: false}
//     connection.query('INSERT INTO engagements SET ?', engagement, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.id);
//     });
//   }
// }




// //for (var i = 0; i < 250; i++) { 
// //  var tdate1, tdate2
// //  var tdateyear = "2022"
// //  var tdatemonth = Math.floor((Math.random() * 7)+5)
//   var tdateday = Math.floor((Math.random() * 30)+1)
//   if (tdatemonth == 2 && tdateday > 28) {
//     tdateday = "15"
//   }
//   tdate1 = tdateyear + "-" + tdatemonth.toString() + "-" + tdateday.toString()
//   var signed = Math.round(Math.random());
//   if (signed == 1) {
//     if (tdateday >= 16 && tdatemonth < 12) {
//       tdate2 = tdateyear + "-" + (tdatemonth+1).toString() + "-" + tdateday.toString()
//     } else if (tdateday < 16) {
//       tdate2 = tdateyear + "-" + tdatemonth.toString() + "-" + (tdateday+14).toString()
//     } else {
//       tdate2 = tdate1;
//     }
//     const engagement = {id: 125+i, cust_id:  Math.floor((Math.random() * 29) + 0), sent_date: tdate1, signed_date: tdate2, sent: true, signed: true}
//     connection.query('INSERT INTO engagements SET ?', engagement, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.id);
//     });
//   } else {
//     const engagement = {id: 125+i, cust_id:  Math.floor((Math.random() * 29) + 0), sent_date: tdate1, sent: true, signed: false}
//     connection.query('INSERT INTO engagements SET ?', engagement, (err, res) => {
//       if(err) throw err;
//       console.log('Last insert ID:', res.id);
//     });
//   }
// }
