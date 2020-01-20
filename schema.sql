

CREATE TABLE categories (
    id INT AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    description TEXT, 
    PRIMARY KEY (id)
);


CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(255 NOT NULL), 
    quantity INT, 
    basePrice FLOAT NOT NULL, 
    category INT NOT NULL, 
    addOns TEXT NOT NULL, 
    image VARCHAR(255), 
    description TEXT, 

    seasonal VARCHAR(255) DEFAULT FALSE,
    FOREIGN KEY (category) REFERENCES categories (id), 
    PRIMARY KEY (id)
);

CREATE TABLE orders(
    id int AUTO_INCREMENT NOT NULL, 
    orderDate DATETIME, 
    user INT NOT NULL, 
    status VARCHAR(255) NOT NULL, 
    pickUpDate DATETIME, 
    total FLOAT NOT NULL, 
    FOREIGN KEY (user) REFERENCES users (id),
    PRIMARY KEY (id)
);

CREATE TABLE orderItem (
    id INT AUTO_INCREMENT NOT NULL, 
    order INT NOT NULL, 
    product INT NOT NULL, 
    quantity INT DEFAULT 1, 
    unitPrice FLOAT NOT NULL, 
    addOns TEXT NOT NULL, 
    subTotal FLOAT NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY (order) REFERENCES orders (id),
    FOREIGN KEY (product) REFERENCES products (id)
);

CREATE TABLE past_orders (
id INT, 
user INT NOT NULL, 
orderDate DATETIME, 
paymentType VARCHAR(255) DEFAULT , 
amount FLOAT NOT NULL, 
PRIMARY KEY (id), 
addon
FOREIGN KEY (user) REFERENCES users (id)

);