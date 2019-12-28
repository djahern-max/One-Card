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
        'Find transactions within a specific range'
      ]
    })
    .then(function(answer) {
      switch (answer) {
        case 'Find transaction by name':
          transactionSearch();
          break;
        case 'Find transactions within a specific range':
          rangeSearch();
          break;
      }
    });
};

let transactionSearch = function() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Whose transactions would you like to see?'
    })
    .then(function(answer) {
      let query =
        'SELECT Name, Posting_Date, Source_Currency_Amount FROM one_card WHERE ?';
      connection.query(query, { oneCard: answer.oneCard }, function(err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            'Name: ' +
              res[i].Name +
              '\nPosting Date: ' +
              res[i].Posting_Date +
              '\nAmount: ' +
              res[i].Source_Currency_Amount +
              '\n--------\n'
          );
        }

        runSearch();
      });
    });
};
