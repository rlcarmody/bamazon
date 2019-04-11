
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(45),
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('sneakers', 'clothing', 49.99, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('headphones', 'electronics', 29.95, 8);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Eloquent Javascript', 'books', 5.50, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('hoodie', 'clothing', 35.00, 16);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('vape pen', 'electronics', 29.99, 23);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('fedora', 'clothing', 16.85, 42);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('The Hobbit', 'books', 11.49, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('La Croix', 'grocery', 4.50, 14);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('thumb drive', 'electronics', 8.99, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('D20 dice', 'games', 9.99, 9);

