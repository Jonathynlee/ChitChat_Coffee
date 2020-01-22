

INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (1,"HOT Coffee",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (2,"Hot Teas",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (3,"Hot Drinks",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (4,"Frappacino",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (5,"Cold Coffees",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (6,"Iced Teas",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (7,"Cold Drinks",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (8,"Food",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");
INSERT INTO categories(id,name,description,createdAt,updatedAt) VALUES (9,"Bean",NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01");




INSERT INTO users (id,username,email,password,phone,addressLineOne,addressLineTwo,city,state,zip,country,createdAt,updatedAt) values (1,"Aysen Unlu","aysenunlu@gmail.com","$2b$10$r.cV35cdfZ3OvRz2OUijvOTuPq13WBNowmhXt0xWDLmJKd1EaPWpK",NULL,NULL,NULL,NULL,NULL,NULL,NULL,"2020-01-21 06:21:26","2020-01-21 06:21:26");



INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (
1,"Americano",NULL,1,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/Americano.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (2,"Blonde Roast",NULL,2,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/BlondeRoast.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (3,"Dark Roast",NULL,3,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/DarkRoast.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (4,"Decaf Piked Roast",NULL,4,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/DecafPikedRoast.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (5,"Capuccino",NULL,5,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/capuccino.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (6,"Espresso",NULL,6,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/espresso.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (7,"Butter Scotch Latte",NULL,7,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/ButterscotchLatte.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (8,"Hazelnut Latte",NULL,8,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/HazelnutLatte.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (9,"Cocoa Cloud Macchiato",NULL,9,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/Macchiato.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);
INSERT INTO products (id,name,quantity,basePrice,addOns,image,description,seasonal,createdAt,updatedAt,categoryId) values (10,"Iced Lemon Cake",NULL,10,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,"assets/images/IcedLemonCake.jpg",NULL,NULL,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);










INSERT INTO orders (id,orderDate,status,pickUpDate,total,createdAt,updatedAt,userId) values (3,"1970-01-01 00:00:01","in_cart","1970-01-01 00:00:01",11,"1970-01-01 00:00:01","1970-01-01 00:00:01",1);



INSERT INTO orderitem (id,quantity,basePrice,addons,subtotal,createdAt,updatedAt,orderId,productId) VALUES (
1,1,1,'[{"question":{"title": "What Kind of Creamer","answers":[{ "title": "Almond Milk","price": 0.50   },   {   "title": "Oat Milk",   "price": 0.50   }  ]}   } ,   {"question":{ "title": "What Flavor",  "answers":[{  "title": "Vanilla",  "price": 0}  ]}   }]'
,1,"1970-01-01 00:00:01","1970-01-01 00:00:01",3,1);


INSERT INTO orderitems (id,quantity,basePrice,addons,subtotal,createdAt,updatedAt,orderId,productId) VALUES (2,1,10,"{}",11,"1970-01-01 00:00:01","1970-01-01 00:00:01",3,11);
