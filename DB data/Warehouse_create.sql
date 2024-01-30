-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-22 22:26:16.235

-- tables
-- Table: Order
CREATE TABLE "Order" (
    IdOrder int  NOT NULL IDENTITY,
    CreatedAt date  NOT NULL,
    Status varchar(10)  NOT NULL,
    idUser int  NOT NULL,
    CONSTRAINT Order_pk PRIMARY KEY  (IdOrder)
);

-- Table: Product
CREATE TABLE Product (
    IdProduct int  NOT NULL IDENTITY,
    Name nchar(200)  NOT NULL,
    Description nchar(200)  NOT NULL,
    Price numeric(25,2)  NOT NULL,
    Amount int  NOT NULL,
    CONSTRAINT Product_pk PRIMARY KEY  (IdProduct)
);

-- Table: Product_Order
CREATE TABLE Product_Order (
    IdProduct int  NOT NULL,
    IdOrder int  NOT NULL,
    Amount int  NOT NULL,
    CONSTRAINT Product_Order_pk PRIMARY KEY  (IdOrder,IdProduct)
);

-- Table: Role
CREATE TABLE Role (
    IdRole int  NOT NULL IDENTITY,
    Role varchar(30)  NOT NULL,
    CONSTRAINT Role_pk PRIMARY KEY  (IdRole)
);

-- Table: User
CREATE TABLE "User" (
    idUser int  NOT NULL IDENTITY,
    FirstName varchar(30)  NOT NULL,
    LastName varchar(30)  NOT NULL,
    PhoneNum int  NOT NULL,
    Email varchar(50)  NOT NULL,
    Password varchar(200)  NOT NULL,
    IdRole int  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY  (idUser)
);

-- foreign keys
-- Reference: Order_User (table: Order)
ALTER TABLE "Order" ADD CONSTRAINT Order_User
    FOREIGN KEY (idUser)
    REFERENCES "User" (idUser);

-- Reference: Product_Order_Order (table: Product_Order)
ALTER TABLE Product_Order ADD CONSTRAINT Product_Order_Order
    FOREIGN KEY (IdOrder)
    REFERENCES "Order" (IdOrder);

-- Reference: Product_Order_Product (table: Product_Order)
ALTER TABLE Product_Order ADD CONSTRAINT Product_Order_Product
    FOREIGN KEY (IdProduct)
    REFERENCES Product (IdProduct);

-- Reference: User_Role (table: User)
ALTER TABLE "User" ADD CONSTRAINT User_Role
    FOREIGN KEY (IdRole)
    REFERENCES Role (IdRole);

-- End of file.

