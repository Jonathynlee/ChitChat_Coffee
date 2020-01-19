CREATE TABLE users (
    userID INT AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phoneNumber VARCHAR(255),
    addressLineOne VARCHAR(255),
    addressLineTwo VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip VARCHAR(255),
    country VARCHAR(255), 
    PRIMARY KEY (userID)
);

CREATE TABLE categories (
    categoryID INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    description TEXT, 
    PRIMARY KEY (categoryID)
);


CREATE TABLE products(
    productID INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    quantity INT, 
    basePrice FLOAT, 
    category INT, 
    addOns TEXT, 
    image VARCHAR(255), 
    description TEXT, 
    seasonal VARCHAR(255),

    FOREIGN KEY (category) REFERENCES categories (categoryID), 
    PRIMARY KEY (productID)
);

CREATE TABLE orders(
    orderID int AUTO_INCREMENT, 
    orderDate DATETIME, 
    userID INT, 
    status VARCHAR(255), 
    pickUpDate DATETIME, 
    total FLOAT, 
    FOREIGN KEY userID REFERENCES users (userID),
    PRIMARY KEY (orderID)
);

CREATE TABLE orderItem (
    orderItemID INT AUTO_INCREMENT, 
    orderID INT, 
    productID INT, 
    quantity INT, 
    unitPrice FLOAT, 
    addOns TEXT, 
    subTotal FLOAT, 
    PRIMARY KEY (orderItemID), 
    FOREIGN KEY (orderID) REFERENCES orders (orderID),
    FOREIGN KEY (productID) REFERENCES products (productID)
);

CREATE TABLE past_orders (
orderID INT, 
userID INT, 
orderDate DATETIME, 
paymentType VARCHAR(255), 
amount FLOAT, 
PRIMARY KEY (orderID), 
FOREIGN KEY (userID) REFERENCES users (userID)

);