CREATE TABLE users (
    userID INT AUTO_INCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    phoneNumber VARCHAR,
    addressLineOne VARCHAR,
    addressLineTwo VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip VARCHAR,
    country VARCHAR, 
    PRIMARY KEY (id)
)

CREATE TABLE categories (
    categoryID INT AUTO_INCREMENT, 
    name VARCHAR, 
    description TEXT, 
    PRIMARY KEY (id)
)

CREATE TABLE products(
    productID INT AUTO_INCREMENT, 
    name VARCAHR, 
    quantity INT, 
    basePrice FLOAT, 
    category VARCHAR, 
    addOns TEXT, 
    image VARCHAR, 
    description TEXT, 
    seasonal VARCHAR,

    FOREIGN KEY (category) REFERENCES categories(name), 
    PRIMARY KEY (id)
);

CREATE TABLE orders(
    orderID int AUTO_INCREMENT, 
    orderDate DATETIME, 
    userID INT, 
    status VARCHAR, 
    pickUpDate DATETIME, 
    total FLOAT, 
    FOREIGN KEY userID REFERENCES users(userID),
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
    PRIMARY KEY (id), 
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES products(productID)
    
    )

);

CREATE TABLE past_orders (
orderID INT, 
userID INT, 
orderDate DATETIME, 
paymentType VARCHAR, 
amount FLOAT, 
PRIMARY KEY (orderID), 
FOREIGN KEY (userID) REFERENCES users(userID), 

);