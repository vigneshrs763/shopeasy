CREATE DATABASE IF NOT EXISTS shopping_complex;
USE shopping_complex;
CREATE TABLE customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL CHECK (phone REGEXP '^[0-9]{10}$')
);
CREATE TABLE items_available (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0)
);
CREATE TABLE order_list (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending','Completed','Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
CREATE TABLE cart_items (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    desired_qty INT NOT NULL CHECK (desired_qty > 0),
    FOREIGN KEY (order_id) REFERENCES order_list(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items_available(item_id)
);
CREATE TABLE products_purchased (
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    purchased_qty INT NOT NULL CHECK (purchased_qty > 0),
    purchase_unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES order_list(order_id),
    FOREIGN KEY (item_id) REFERENCES items_available(item_id),
    UNIQUE (order_id, item_id)
);
INSERT INTO customer (customer_name,email,phone) VALUES
('Alice Johnson','alice@gmail.com','9876543210'),
('Bob Smith','bob@yahoo.com','9876543211'),
('Charlie Davis','charlie@outlook.com','9876543212'),
('David Wilson','david@domain.com','9876543213'),
('Eve Martin','eve@sample.org','9876543214'),
('Frank Thomas','frank@test.com','9876543215'),
('Grace Lee','grace@mail.com','9876543216'),
('Heidi Clark','heidi@corp.com','9876543217'),
('Ivan Patel','ivan@web.com','9876543218'),
('Judy Brown','judy@store.com','9876543219');
INSERT INTO items_available (item_name,unit_price,stock_qty) VALUES
('Wireless Mouse',25.00,50),
('Mechanical Keyboard',75.00,20),
('HD Monitor',150.00,10),
('USB-C Cable',10.00,100),
('Gaming Headset',60.00,15),
('Laptop Stand',30.00,25),
('Webcam 1080p',45.00,8),
('Desk Mat',15.00,40),
('External SSD 1TB',110.00,12),
('Bluetooth Speaker',40.00,0);
INSERT INTO order_list (customer_id,status) VALUES
(1,'Completed'),(2,'Completed'),(3,'Completed'),
(4,'Completed'),(5,'Completed'),(6,'Pending'),
(7,'Pending'),(8,'Pending'),(9,'Pending'),
(10,'Cancelled');
INSERT INTO cart_items (order_id,item_id,desired_qty) VALUES
(1,1,2),(1,4,3),(2,2,1),(3,3,1),(4,5,2),
(5,6,1),(6,7,1),(7,8,4),(8,9,1),(9,10,2);
INSERT INTO products_purchased
(order_id,item_id,purchased_qty,purchase_unit_price) VALUES
(1,1,2,25.00),(1,4,3,10.00),(2,2,1,75.00),
(3,3,1,150.00),(4,5,2,60.00),(5,6,1,30.00),
(2,4,2,10.00),(3,8,1,15.00),(4,1,1,25.00),
(5,9,1,110.00);
CREATE VIEW view_available_inventory AS
SELECT item_id,item_name,unit_price,stock_qty
FROM items_available
WHERE stock_qty > 0;
DELIMITER $$
CREATE TRIGGER trg_after_product_purchased
AFTER INSERT ON products_purchased
FOR EACH ROW
BEGIN
    UPDATE items_available
    SET stock_qty = stock_qty - NEW.purchased_qty
    WHERE item_id = NEW.item_id;
END$$
CREATE PROCEDURE ProcessOrderCheckout(IN p_order_id INT)
BEGIN
    DECLARE v_status VARCHAR(20);
    DECLARE v_count INT DEFAULT 0;
    SELECT status INTO v_status
    FROM order_list WHERE order_id = p_order_id;
    IF v_status IS NULL OR v_status <> 'Pending' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order must be pending';
    END IF;
    SELECT COUNT(*) INTO v_count
    FROM cart_items c
    JOIN items_available i ON i.item_id = c.item_id
    WHERE c.order_id = p_order_id
    AND (i.stock_qty < c.desired_qty OR i.stock_qty = 0);
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
    INSERT INTO products_purchased
    (order_id,item_id,purchased_qty,purchase_unit_price)
    SELECT c.order_id,c.item_id,c.desired_qty,i.unit_price
    FROM cart_items c
    JOIN items_available i ON i.item_id = c.item_id
    WHERE c.order_id = p_order_id;
    UPDATE order_list SET status = 'Completed'
    WHERE order_id = p_order_id;
END$$
DELIMITER ;
SELECT * FROM view_available_inventory;
SELECT c.customer_id,c.customer_name,
       COUNT(DISTINCT o.order_id) AS total_orders,
       SUM(pp.purchased_qty) AS total_items_bought,
       SUM(pp.purchased_qty * pp.purchase_unit_price) AS total_spent
FROM customer c
JOIN order_list o ON o.customer_id = c.customer_id
JOIN products_purchased pp ON pp.order_id = o.order_id
WHERE o.status = 'Completed'
GROUP BY c.customer_id,c.customer_name
ORDER BY total_spent DESC;

