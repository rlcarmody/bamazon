const cTable = require('console.table');
const mySQL = require('mysql');
const inquirer = require('inquirer');
const conn = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

const fetchProducts = () => {
    return new Promise(resolve => {
        conn.query(
            'SELECT item_id AS ID, product_name AS Product, price AS Price FROM products WHERE stock_quantity > 0', (err, results) => {
                if (err) throw err;
                console.log('\n')
                console.table(results);
                resolve();
                // promptCustomer();
            }
        )
    })
    
}

const promptCustomer = () => {
    inquirer.prompt([
        {
            message: 'Enter the ID of the product you wish to purchase',
            name: 'ID',
            validate: function (input) {
                if (parseInt(input)) {
                    return true
                }
                return 'Please enter a numeric id'
            }
        },
        {
            message: 'How many would you like to purchase?',
            name: 'quantity',
            validate: function (input) {
                if (parseInt(input) > 0) {
                    return true
                }
                return 'Please enter a whole number'
            }
        }
    ]).then(answers => {
        const item = parseInt(answers.ID);
        const quantity = parseInt(answers.quantity);
        purchaseItem(item, quantity)
        // fetchProducts();
    })
}

// fetchProducts();

const purchaseItem = (product, quantity) => {
    conn.query(
        'SELECT stock_quantity, price FROM products WHERE ?',{item_id: product}, (err, results) => {
            if (err) throw err;
            const totalPrice = quantity * results[0].price;
            const remainingQuantity = results[0].stock_quantity - quantity;
            if (parseInt(results[0].stock_quantity) < quantity) {
                console.log('Insufficient Quantity')
            } else {
                conn.query(
                    'UPDATE products SET ? WHERE ?',
                    [
                        {stock_quantity: remainingQuantity},
                        {item_id: product}
                    ]
                )
                console.log('\nThank you for your purchase. \n\nYour total is $' + totalPrice.toFixed(2));
            }
            conn.end();
        }
    )
}

const startApp = async () => {
    await fetchProducts();
    promptCustomer();
}

startApp();