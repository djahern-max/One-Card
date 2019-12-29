let mysql = require('mysql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'CWkeller1234!',
  database: 'one_card'
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

let runSearch = function() {
  // console.log('Connection Successful!');
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Find transaction by name',
        'Find vendor by merchant name',
        'Find transactions by merchant name',
        'Find transaction and department of employee'
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'Find transaction by name':
          transactionSearch();
          break;
        case 'Find vendor by merchant name':
          merchantSearch();
          break;
        case 'Find transactions by merchant name':
          merchantTransSearch();
          break;
        case 'Find transaction and department of employee':
          transAndDepartmentSearch();
          break;
      }
    });
};

let transactionSearch = function() {
  inquirer
    .prompt({
      name: 'Name',
      type: 'input',
      message: 'What cardholder transactions would you like to see?'
    })
    .then(function(answer) {
      let query =
        'SELECT Name, Source_Currency_Amount, Merchant_Name FROM one_card WHERE ?';
      connection.query(query, { Name: answer.Name }, function(err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            'Name: ' +
              res[i].Name +
              '\nAmount: ' +
              res[i].Source_Currency_Amount +
              '\nMerchant Name: ' +
              res[i].Merchant_Name +
              '\n--------\n'
          );
        }

        runSearch();
      });
    });
};

function merchantSearch() {
  inquirer
    .prompt({
      name: 'Merchant_Name',
      type: 'input',
      message: 'What Merchant would you like to look for?'
    })
    .then(function(answer) {
      console.log(answer.Merchant_Name);
      connection.query(
        'SELECT * FROM one_card WHERE ?',
        { Merchant_Name: answer.Merchant_Name },
        function(err, res) {
          console.log(
            'Merchant_Name: ' +
              res[0].Merchant_Name +
              ' || Merchant_City: ' +
              res[0].Merchant_City +
              ' || Merchant_State: ' +
              res[0].Merchant_State
          );
          runSearch();
        }
      );
    });
}

let merchantTransSearch = function() {
  inquirer
    .prompt({
      name: 'Merchant_Name',
      type: 'input',
      message: 'Which Merchant transactions would you like to see?'
    })
    .then(function(answer) {
      let query =
        'SELECT Merchant_Name, Source_Currency_Amount, Posting_Date, Name FROM one_card WHERE ?';
      connection.query(query, { Merchant_Name: answer.Merchant_Name }, function(
        err,
        res
      ) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            'Merchant_Name: ' +
              res[i].Merchant_Name +
              '\nAmount: ' +
              res[i].Source_Currency_Amount +
              '\nPosting_Date: ' +
              res[i].Posting_Date +
              '\nName: ' +
              res[i].Name +
              '\n--------\n'
          );
        }
        runSearch();
      });
    });
};

let transAndDepartmentSearch = function() {
  inquirer
    .prompt({
      name: 'Name',
      type: 'input',
      message:
        'What cardholder transactions and department would you like to see?'
    })
    .then(function(answer) {
      let query =
        'SELECT employee_data.Name,employee_data.Department FROM employee_data';
      query += 'INNER JOIN ';
    });
};
