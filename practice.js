let mysql = require('mysql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'CWkeller1234!',
  database: 'sql_store'
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

let runSearch = function() {
  //   console.log('Connection Successful!');
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: ['Find customer by name']
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'Find customer by name':
          customerSearch();
          break;
      }
    });
};

let customerSearch = function() {
  inquirer
    .prompt({
      name: 'last_name',
      type: 'input',
      message: 'What cardholder transactions would you like to see?'
    })
    .then(function(answer) {
      let query =
        'SELECT order_id, orders.customer_id, first_name, last_name FROM orders JOIN customers ON orders.customer_id = customers.customer_id ';
      connection.query(query, { last_name: answer.last_name }, function(
        err,
        res
      ) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            'order_id: ' +
              res[i].order_id +
              '\ncustomer_id : ' +
              res[i].customer_id +
              '\nfirst_name: ' +
              res[i].first_name +
              '\nlast_name: ' +
              res[i].last_name +
              '\n--------\n'
          );
        }

        runSearch();
      });
    });
};
