# ShopEasy–Shopping Management System

## 1. Project Overview

ShopEasy is a Shopping Management System developed as a Database Management System (DBMS) project. It manages customer details, product inventory, orders, shopping cart items, and purchased products using a MySQL database.

The system helps maintain accurate inventory records, process customer orders, and generate useful reports about product availability and customer spending.

## 2. Objectives

- Store and manage customer information.
- Maintain product details, prices, and stock quantities.
- Manage customer orders and shopping cart items.
- Record purchased products.
- Automatically update inventory after purchases.
- Generate reports using SQL queries.
- Demonstrate database concepts such as tables, constraints, views, triggers, and stored procedures.

## 3. Technologies Used

- **Database:** MySQL
- **Language:** SQL
- **Database Concepts:** Primary Keys, Foreign Keys, Constraints, Views, Triggers, Stored Procedures, and Joins

## 4. Database Structure

The project uses the `shopping_complex` database with the following tables:

| Table Name | Description |
|---|---|
| `customer` | Stores customer details, email, and phone number. |
| `items_available` | Stores product names, prices, and available stock. |
| `order_list` | Stores customer orders, dates, and order status. |
| `cart_items` | Stores products and quantities associated with orders. |
| `products_purchased` | Records products purchased through orders. |

## 5. Key Features

### Customer Management
Stores customer information and maintains unique customer records.

### Product and Inventory Management
Maintains product names, prices, and stock quantities. Inventory can be checked using SQL queries.

### Order Management
Records customer orders and tracks their status as Pending, Completed, or Cancelled.

### Shopping Cart Management
Stores the products and quantities selected for each order.

### Purchase Management
Records purchased products and their purchase prices.

### Automatic Stock Update
A database trigger reduces the available stock whenever a purchase record is inserted.

### Order Checkout
The `ProcessOrderCheckout` stored procedure processes pending orders, checks product availability, records purchases, and updates the order status.

### Inventory View
The `view_available_inventory` view displays product information and available stock.

### Customer Spending Report
SQL queries calculate customer spending based on recorded purchases.

## 6. Database Relationships

- One customer can place multiple orders.
- One order can contain multiple cart items.
- Each cart item references a product.
- An order can contain multiple purchased products.
- Product inventory is maintained in the `items_available` table.

Foreign keys maintain relationships between the tables and help preserve data integrity.

## 7. Installation and Setup

### Prerequisites

Install MySQL Server and a MySQL client such as MySQL Workbench or the MySQL command-line client.

### Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
```

### Step 2: Open the Project

Navigate to the downloaded project folder and locate the SQL script.

### Step 3: Execute the SQL Script

Open the SQL file in MySQL Workbench or another MySQL client and execute the complete script.

Alternatively, run the following command from your terminal:

```bash
mysql -u root -p < shopeasy_simple.sql
```

Enter your MySQL password when prompted.

The script creates the database, tables, sample records, view, trigger, and stored procedure.

## 8. Sample SQL Queries

### Display Available Products

```sql
SELECT *
FROM view_available_inventory;
```

### Find Products Priced Below 50

```sql
SELECT item_name, unit_price
FROM items_available
WHERE unit_price < 50;
```

### Display Pending Orders

```sql
SELECT *
FROM order_list
WHERE status = 'Pending';
```

### Display Customer Orders

```sql
SELECT c.customer_name, o.order_id, o.order_date, o.status
FROM customer c
JOIN order_list o
ON c.customer_id = o.customer_id;
```

### Calculate Customer Spending

```sql
SELECT c.customer_name,
       SUM(p.purchased_qty * p.purchase_unit_price) AS total_spending
FROM customer c
JOIN order_list o ON c.customer_id = o.customer_id
JOIN products_purchased p ON o.order_id = p.order_id
GROUP BY c.customer_id, c.customer_name;
```

## 9. Database Concepts Demonstrated

This project demonstrates the practical use of:

- **DDL:** Creating databases, tables, and views.
- **DML:** Inserting and updating records.
- **DQL:** Retrieving data using SELECT queries.
- **Primary Keys:** Uniquely identifying records.
- **Foreign Keys:** Establishing relationships between tables.
- **Constraints:** Maintaining valid and consistent data.
- **Views:** Simplifying frequently used queries.
- **Triggers:** Automating inventory updates.
- **Stored Procedures:** Processing order checkout.
- **Aggregate Functions:** Calculating customer spending and generating reports.

## 10. Future Enhancements

- Develop a web-based shopping interface.
- Add customer registration and login.
- Integrate a backend API with the MySQL database.
- Implement online payment integration.
- Add product search, filtering, and sorting.
- Create an administrative dashboard for managing products and orders.
- Generate sales and inventory reports.

## 11. Conclusion

ShopEasy demonstrates how MySQL can be used to develop a structured and reliable shopping management database. It integrates customer management, inventory tracking, order processing, and purchase reporting while applying important DBMS concepts.

The project provides a foundation for developing a complete full-stack shopping application in the future.

## 12. Author

**Project:** ShopEasy – Shopping Management System  
**Project Type:** Database Management System (DBMS)  
**Database:** MySQL
