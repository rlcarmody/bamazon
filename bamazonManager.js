const cTable = require('console.table');
const mySQL = require('mysql');
const inquirer = require('inquirer');
const conn = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

const displayInventory = (whereClause = '') => {
    conn.query(
        `SELECT item_id AS ID, 
         product_name AS Product, 
         department_name AS Department, 
         price AS Price, 
         stock_quantity AS Quantity
         FROM products ` + whereClause,
        (err, results) => {
            if (err) throw err;
            console.log('\n')
            console.table(results);
            appStart();
        })
}

const addInventory = () => {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Please enter the ID of the product to update',
            validate: function (input) {
                if (parseInt(input) > 0) {
                    return true
                }
                return 'Please enter a valid ID'
            }
        },
        {
            name: 'addQuantity',
            message: 'How many would you like to add to inventory',
            validate: function (input) {
                if (parseInt(input) > 0) {
                    return true
                }
                return 'Please enter a whole number'
            }
        }
    ]).then(answers => {
        const itemId = answers.id;
        const quantityToAdd = answers.addQuantity
        conn.query(
            'UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?',
            [
                quantityToAdd,
                { item_id: itemId }
            ], (err, results) => {
                if (err) throw err;
                displayInventory();
            })
    })
}
const addNewProduct = () => {
    inquirer.prompt([
        {
            message: 'What is the name of the product?',
            name: 'productName'
        },
        {
            message: 'What is the department for this product',
            name: 'department'
        },
        {
            message: 'What is the retail price of this product',
            name: 'price',
            validate: function (input) {
                if (parseFloat(input) > 0) {
                    return true
                }
                return 'Please enter a valid price'
            }
        },
        {
            message: 'How many products are in inventory',
            name: 'quantity',
            validate: function (input) {
                if (parseInt(input) > 0) {
                    return true
                }
                return 'Please enter a valid price'
            }
        }
    ]).then(answers => {
        const productName = conn.escape(answers.productName);
        const department = conn.escape(answers.department);
        const price = conn.escape(parseFloat(answers.price));
        const quantity = conn.escape(parseInt(answers.quantity));
        conn.query(
            `INSERT INTO products (product_name, department_name, price, stock_quantity)
            VALUES(${productName},${department},${price},${quantity})`, err => {
                if (err) throw err;
                displayInventory();
            }
        )
    })
}
const userOptions = [{
    name: 'View Products for Sale',
    value: displayInventory
},
{
    name: 'View Low Inventory',
    value: function () { displayInventory('WHERE stock_quantity < 5') }
},
{
    name: 'Add to Inventory',
    value: addInventory
},
{
    name: 'Add a New Product',
    value: addNewProduct
},
{
    name: 'Quit',
    value: function () {
        conn.end()
    }
}
]

const appStart = () => {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: 'action',
            choices: userOptions
        }
    ]).then(answer => {
        answer.action()
    })
}

appStart();